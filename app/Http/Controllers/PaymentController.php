<?php

namespace App\Http\Controllers;

use App\Mail\PurchaseConfirmationMail;
use App\Models\PaymentTransaction;
use App\Models\PromoCode;
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
use YooKassa\Client;
use YooKassa\Model\Payment\PaymentStatus;
use Telegram;

class PaymentController extends Controller
{
    protected $paymentService;
    protected NotificationService $notificationService;

    const SUPPORT_LINK = 'https://t.me/putclub_info';
    const SUCCESS_ROUTE = 'courses';

    public function __construct(PaymentService $paymentService, NotificationService $notificationService)
    {
        $this->paymentService = $paymentService;
        $this->notificationService = $notificationService;
    }

    public function handleReturn(Request $request)
    {
        $transactionId = $request->query('transaction_id');

        if (!$transactionId) {
            return $this->redirectToPaymentFail('Ошибка возврата', null);
        }

        $transaction = PaymentTransaction::find($transactionId);

        if (!$transaction) {
            return $this->redirectToPaymentFail('Ошибка: Транзакция не найдена в системе.', null);
        }

        try {
            if ($transaction->status === 'succeeded') {
                return redirect()->route(self::SUCCESS_ROUTE)->with('payment_success', [
                    'title' => 'Добро пожаловать в увлекательный мир туризма!',
                    'body' => 'Мы рады сообщить, доступ к выбранному Вами пакету отправлен на Вашу почту.',
                    'support_link_text' => 'службу заботы',
                    'support_link_url' => self::SUPPORT_LINK,
                ]);
            } else {
                return $this->redirectToPaymentFail('К сожалению, оплату не удалось провести. Пожалуйста, попробуйте снова.', null);
            }
        } catch (\Exception $e) {
            Log::error("Error processing return for transaction {$transactionId}: " . $e->getMessage());
            return $this->redirectToPaymentFail('Системная ошибка при проверке статуса платежа.', null);
        }
    }

    public function index(Request $request)
    {
        $status = $request->input('status');

        $query = PaymentTransaction::with(['user', 'package', 'referral'])
            ->orderByDesc('id');

        if ($status) {
            $query->where('status', $status);
        }

        $transactions = $query->paginate(20)->appends($request->query());

        return response()->json([
            'data' => $transactions->items(),
            'meta' => [
                'current_page' => $transactions->currentPage(),
                'per_page' => $transactions->perPage(),
                'last_page' => $transactions->lastPage(),
                'total' => $transactions->total(),
            ],
            'links' => [
                'next' => $transactions->nextPageUrl(),
                'prev' => $transactions->previousPageUrl(),
            ],
        ]);
    }

    public function create(Request $request)
    {
        $email = $request->input('email');
        $userData = [
            'full_name' => $request->input('full_name'),
            'phone_number' => $request->input('phone_number'),
            'agrees_to_marketing' => $request->boolean('agrees_to_marketing'),
            'password' => Hash::make(Str::random(12)),
        ];
        $user = User::updateOrCreate(['email' => $email], $userData);

        $packageId = $request->input('package_id');
        $amount = $request->input('amount');
        $paymentTransaction = PaymentTransaction::create([
            'user_id' => $user->id,
            'package_id' => $packageId,
            'amount' => $amount,
            'status' => 'pending',
        ]);

        $paymentData = [
            'user_id' => $user->id,
            'transaction_id' => $paymentTransaction->id,
            'package_id' => $packageId,
            'course_name' => 'Пакет "' . $request->input('course_name') . '"',
            'full_name' => $request->input('full_name'),
            'phone_number' => $request->input('phone_number'),
            'email' => $email,
            'promo_code_id' => $request->input('promo_code_id'),
            'discount_type' => $request->input('discount_type'),
            'discount_value' => $request->input('discount_value'),
            'ref_id' => $request->input('ref_id'),
            'ref_code' => $request->input('ref_code'),
            'full_name_ref' => $request->input('full_name_ref'),
            'tg_username' => $request->input('tg_username'),
        ];

        $idempotencyKey = Uuid::uuid4()->toString();
        $paymentInfo = $this->paymentService->createPayment(
            $amount,
            $paymentData['course_name'],
            $paymentData,
            $idempotencyKey
        );

        $paymentTransaction->update(['payment_id' => $paymentInfo['id']]);

        return $paymentInfo['url'];
    }

    public function callback(Request $request)
    {
        $source = $request->getContent();
        $requestBody = json_decode($source, true);
        $paymentData = $requestBody['object'] ?? null;

        if (!$paymentData || !isset($paymentData['status'], $paymentData['id'])) {
            return response()->json(['message' => 'Invalid notification structure'], 400);
        }

        $transaction = PaymentTransaction::where('payment_id', '=', $paymentData['id'])->first();

        if (!$transaction) {
            Log::warning('Transaction not found via payment_id in callback', ['payment_id' => $paymentData['id']]);
            return response()->json(['message' => 'Transaction not found, but event acknowledged'], 200);
        }

        if ($transaction->status === 'succeeded' && $paymentData['status'] === 'succeeded') {
            return response()->json(['message' => 'Already succeeded'], 200);
        }

        $transaction->payment_id = $paymentData['id'];
        $paymentStatus = $paymentData['status'];

        switch ($paymentStatus) {
            case 'succeeded':
                $this->handleSucceeded($transaction, $paymentData);
                break;
            case 'canceled':
                $this->handleCanceled($transaction, $paymentData);
                break;
            case 'waiting_for_capture':
                $this->handleWaitingForCapture($transaction, $paymentData);
                break;
            default:
                Log::info("Unhandled payment status '{$paymentStatus}' for transaction {$transaction->id}");
                break;
        }

        $transaction->save();
        return response()->json(['message' => 'Event processed successfully'], 200);
    }

    protected function handleSucceeded(PaymentTransaction $transaction, array $paymentData)
    {
        $metadata = $paymentData['metadata'];
        $amount = (float)$paymentData['amount']['value'];

        $transaction->status = 'succeeded';
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
        ));
    }

    protected function handleCanceled(PaymentTransaction $transaction, array $paymentData)
    {
        Log::info('Transaction canceled', ['transaction_id' => $transaction->id]);
        $transaction->status = 'canceled';

        $metadata = $paymentData['metadata'];
        $amount = (float)$paymentData['amount']['value'];
        $promoInfo = $this->formatPromoInfo($metadata);


        $this->notificationService->sendPaymentFailedNotification(
            $metadata['course_name'] ?? 'Unknown Package',
            $metadata['full_name'] ?? 'Guest',
            $metadata['phone_number'] ?? 'Unknown',
            $metadata['email'] ?? 'Unknown',
            $amount,
            $promoInfo,
            $metadata['ref_code'] ?? null,
            $metadata['full_name_ref'] ?? null,
            $metadata['tg_username'] ?? null
        );
    }

    protected function handleWaitingForCapture(PaymentTransaction $transaction, array $paymentData)
    {
        $transaction->status = PaymentStatus::WAITING_FOR_CAPTURE;
        Log::info("Payment ID {$paymentData['id']} waiting for capture. Initiating capture...");

        $client = new Client();
        $client->setAuth(
            config('services.yookassa.shop_id'),
            config('services.yookassa.secret_key')
        );

        try {
            $captureResponse = $client->capturePayment(
                ['amount' => $paymentData['amount']],
                $paymentData['id'],
                uniqid('capture_', true)
            );

            if ($captureResponse->getStatus() === 'succeeded') {
                $transaction->status = PaymentStatus::SUCCEEDED;
                Log::info("Payment ID {$paymentData['id']} successfully captured.");
            } else {
                Log::warning("Capture attempt for Payment ID {$paymentData['id']} failed. Status: " . $captureResponse->getStatus());
            }
        } catch (\Exception $e) {
            Log::error("Error during YooKassa payment capture for ID {$paymentData['id']}: " . $e->getMessage());
        }
    }

    protected function redirectToPaymentFail(string $title, ?string $body)
    {
        return redirect()->route(self::SUCCESS_ROUTE)->with('payment_fail', [
            'title' => $title,
            'body' => $body,
            'support_link_text' => 'службу заботы',
            'support_link_url' => self::SUPPORT_LINK,
        ]);
    }

    protected function formatPromoInfo(array $metadata): string
    {
        $promo_code_id = $metadata['promo_code_id'] ?? null;
        $discount_type = $metadata['discount_type'] ?? null;
        $discount_value = $metadata['discount_value'] ?? null;

        if (!$promo_code_id || !$discount_type || $discount_value === null) {
            return '';
        }

        $value_formatted = '';

        switch ($discount_type) {
            case 'percent':
                $value_formatted = "{$discount_value}%";
                break;
            case 'fixed':
                $value_formatted = "{$discount_value} р";
                break;
            default:
                $value_formatted = "{$discount_value} ({$discount_type})";
                break;
        }

        return sprintf("\n[🔥 Промокод применен: Скидка %s]", $value_formatted);
    }

    protected function processPromoCodeUsage(PaymentTransaction $transaction)
    {
        if (!$transaction->promo_code_id) {
            return;
        }
        $promo = PromoCode::find($transaction->promo_code_id);

        if ($promo && is_null($promo->used_at)) {
            $promo->is_used = true;
            $promo->used_at = Carbon::now();
            if (is_null($promo->user_id) && $transaction->user_id) {
                $promo->user_id = $transaction->user_id;
            }
            $promo->save();
        }
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
}
