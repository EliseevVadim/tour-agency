<?php

namespace App\Http\Controllers;

use App\Mail\PurchaseConfirmationMail;
use App\Models\Package;
use App\Models\PaymentTransaction;
use App\Models\Referral;
use App\Models\User;
use App\Services\NotificationService;
use App\Services\PaymentService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Ramsey\Uuid\Uuid;
use Telegram;

class GetCourseController extends Controller
{
    protected NotificationService $notificationService;
    const SUPPORT_LINK = 'https://t.me/putclub_info';
    const SUCCESS_ROUTE = 'courses';

    public function __construct(NotificationService $notificationService)
    {
        $this->notificationService = $notificationService;
    }

    public function handleData(Request $request)
    {
        $data = $request->all();
        Log::info(json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

        $user = User::query()->firstOrCreate(
            ['email' => $data['email']],
            [
                'full_name' => $data['full_name'],
                'phone_number' => $data['phone_number'] ?? null,
                'agrees_to_marketing' => true,
                'password' => Hash::make(Str::random(32)),
            ]
        );

        $user->fill([
            'full_name' => $data['full_name'],
            'phone_number' => $data['phone_number'] ?? $user->phone_number,
        ])->save();

        Log::info('Saved phone_number=' . $user->phone_number);
        Log::info('WasChanged phone_number=' . (int)$user->wasChanged('phone_number'));
        Log::info('Changes: ' . json_encode($user->getChanges(), JSON_UNESCAPED_UNICODE));
        Log::info('Fresh from DB phone_number=' . $user->fresh()->phone_number);

        $package = Package::query()
            ->where('id_getCourse', $data['package'])
            ->firstOrFail();

        $paymentTransaction = PaymentTransaction::create([
            'user_id' => $user->id,
            'package_id' => $package->id ?? null,
            'amount' => $package->price_new ?? null,
            'status' => 'pending',
            'payment_id' => $data['payment_id'] ?? null,
            'payment_link' => $data['payment_link'] ?? null,
            'expires_at' => Carbon::now()->addHour(),
        ]);

        $refName = $data['ref'];
        $ref = Referral::query()->where('ref_code', $refName)->firstOrFail();

        $refId = $ref->id;
        if ($refId) {
            $paymentTransaction->ref_id = $refId;
            $paymentTransaction->save();
        }
        return response()->json(['status' => 'success', 'message' => 'Data processed'], 200);
    }

    public function handleSuccessPayment(Request $request)
    {
        Log::info('start success payment');
        $data = $request->all();
        $transaction = PaymentTransaction::query()
            ->where('payment_id', $data['payment_id'] ?? null)
            ->first();

        $package = Package::query()
            ->where('id_getCourse', $data['package'] ?? null)
            ->first();

        if (!$transaction || !$package) {
            Log::warning("Payment Success: Transaction or Package not found for GC data.", $data);
            return response()->json(['status' => 'error', 'message' => 'Data not found'], 404);
        }

        $transaction->status = 'succeeded';
        $transaction->payment_at = Carbon::now();

        $transaction->save();
        $ref = $transaction->referral;

        $packageLink = $transaction->package->content_link ?? null;

        //COMMENT: Получение одноразовой ссылки для вступления в телеграмм
        //$link = $this->getTelegramLink($packageLink) ? $this->getTelegramLink($packageLink) : "#";

        $this->notificationService->sendPurchaseNotification(
            $package->name ?? 'Unknown Package',
            $data['full_name'] ?? 'Guest',
            $data['phone_number'] ?? 'Unknown',
            $data['email'] ?? 'Unknown',
            $package->price_new,
            null,
            $ref->ref_code ?? null,
            $ref->full_name ?? null,
            $ref->tg_username ?? null
        );
        Log::info('sent success notification to tg');

        //COMMENT: Скрытие отправки сообщения с одноразовой ссылкой для вступления в телеграмм
       /* Mail::to($data['email'])->queue(new PurchaseConfirmationMail(
            $package->id,
            $link,
        ));
        Log::info('sent success notification to mail');*/

    }

    public function handleFailurePayment(Request $request)
    {
        Log::info('start failure payment');
        $data = $request->all();
        $transaction = PaymentTransaction::query()
            ->where('payment_id', $data['payment_id'] ?? null)
            ->first();

        $package = Package::query()
            ->where('id_getCourse', $data['package'] ?? null)
            ->first();

        if (!$transaction || !$package) {
            Log::warning("Payment Failure: Transaction or Package not found for GC data.", $data);
            return response()->json(['status' => 'error', 'message' => 'Data not found'], 404);
        }

        $transaction->status = 'canceled';
        $transaction->save();

        $ref = $transaction->referral;

        $this->notificationService->sendPaymentFailedNotification(
            $package->name ?? 'Unknown Package',
            $data['full_name'] ?? 'Guest',
            $data['phone_number'] ?? 'Unknown',
            $data['email'] ?? 'Unknown',
            $package->price_new,
            null,
            $ref->ref_code ?? null,
            $ref->full_name ?? null,
            $ref->tg_username ?? null,
            $transaction->payment_link
        );
        Log::info('sent failure payment in telegram');

        return response()->json(['status' => 'success', 'message' => 'Transaction marked as canceled and notification sent'], 200);
    }

    public function handleCooldownPayment(Request $request)
    {
        return $this->handlePaymentStatus($request, 'cooldown', 'Payment Cooldown');
    }

    public function handleUserFailurePayment(Request $request)
    {
        return $this->handlePaymentStatus($request, 'pending', 'Payment User Failure');
    }

    private function handlePaymentStatus(Request $request, string $status, string $logPrefix)
    {
        Log::info("{$logPrefix}: start");

        $validator = Validator::make($request->all(), [
            'payment_id' => ['required'],
            'package'    => ['required']
        ]);

        if ($validator->fails()) {
            Log::warning("{$logPrefix}: validation failed", [
                'errors' => $validator->errors()->toArray(),
                'payload' => $request->all(),
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = $validator->validated();

        $transaction = PaymentTransaction::query()
            ->where('payment_id', $data['payment_id'])
            ->first();

        $package = Package::query()
            ->where('id_getCourse', $data['package'])
            ->first();

        if (!$transaction || !$package) {
            Log::warning("{$logPrefix}: Transaction or Package not found for GC data.", [
                'payment_id' => $data['payment_id'],
                'package' => $data['package'],
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Data not found',
            ], 404);
        }

        if ($transaction->status !== $status) {
            $transaction->forceFill(['status' => $status])->save();
        }

        Log::info("{$logPrefix}: end", [
            'payment_id' => $transaction->payment_id,
            'transaction_id' => $transaction->id ?? null,
            'status' => $transaction->status,
        ]);

        return response()->json(['status' => 'ok']);
    }
    public function getTelegramLink($chatId)
    {
        if (!$chatId) return null;

        try {
            $parameters = [
                'chat_id' => $chatId,
                'member_limit' => 1,
                'name' => 'one_time_link',
            ];
            $response = Telegram::createChatInviteLink($parameters);
            return $response->invite_link;
        } catch (\Exception $e) {
            Log::error("Failed to create Telegram link for chat ID {$chatId}: " . $e->getMessage());
            return null;
        }
    }

    public function handleSuccessReturn(Request $request): \Illuminate\Http\RedirectResponse
    {
        return redirect()->route(self::SUCCESS_ROUTE)->with('payment_success', [
            'title' => 'Добро пожаловать в увлекательный мир туризма!',
            'body' => 'Мы рады сообщить, доступ к выбранному Вами пакету отправлен на Вашу почту.',
            'support_link_text' => 'службу заботы',
            'support_link_url' => self::SUPPORT_LINK,
        ]);
    }
}
