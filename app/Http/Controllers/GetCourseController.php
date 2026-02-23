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
use Illuminate\Support\Str;
use Ramsey\Uuid\Uuid;

class GetCourseController extends Controller
{
    protected NotificationService $notificationService;

    public function __construct(NotificationService $notificationService)
    {
        $this->notificationService = $notificationService;
    }

    public function handleData(Request $request)
    {
        $data = $request->all();
        Log::info(json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

        $email = $data['email'];
        $userData = [
            'full_name' => $data['full_name'],
            'phone_number' => $data['phone_number'],
            'agrees_to_marketing' => true,
            'password' => Hash::make(Str::random(12)),
        ];
        $user = User::updateOrCreate(['email' => $email], $userData);

        $packageId = $data['package'];
        $package = Package::query()->where('id_getCourse', $packageId)->firstOrFail();

        Log::info( '$data->payment_id');
        Log::info( $data['payment_id']);
        $paymentTransaction = PaymentTransaction::create([
            'user_id' => $user->id,
            'package_id' => $package->id ?? null,
            'amount' => $package->price_new ?? null,
            'status' => 'pending',
            'payment_id' => $data['payment_id'] ?? null,
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
        /* $transaction->status = 'succeeded';
         $transaction->payment_method = $paymentData['payment_method']['type'] ?? 'unknown';
         $transaction->payment_at = Carbon::now();
         $transaction->promo_code_id = $metadata['promo_code_id'] ?? $transaction->promo_code_id;
         $transaction->ref_id = $metadata['ref_id'] ?? $transaction->ref_id;

         $this->processPromoCodeUsage($transaction);

         $courseName = $metadata['course_name'];
         $email = $metadata['email'];
         $userName = $metadata['full_name'];
         $phone = $metadata['phone_number'];

         $packageLink = $transaction->package->content_link ?? null;
         $link = $this->getTelegramLink($packageLink) ? $this->getTelegramLink($packageLink) : "#";

         $promoInfo = $this->formatPromoInfo($metadata);
         $this->notificationService->sendPurchaseNotification(
             $courseName ?? 'Unknown Package',
             $userName ?? 'Guest',
             $phone,
             $email ?? 'Unknown',
             $amount,
             $promoInfo,
             $metadata['ref_code'] ?? null,
             $metadata['full_name_ref'] ?? null,
             $metadata['tg_username'] ?? null
         );

         Mail::to($email)->queue(new PurchaseConfirmationMail(
             $courseName,
             $userName,
             $link,
         ));*/
    }

    public function handleFailurePayment(Request $request)
    {
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
            $ref->tg_username ?? null
        );

        return response()->json(['status' => 'success', 'message' => 'Transaction marked as canceled and notification sent'], 200);
    }
}
