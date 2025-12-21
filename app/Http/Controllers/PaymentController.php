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
use YooKassa\Client;
use YooKassa\Client\BaseClient;
use App\Enums\NotificationEventType;
use YooKassa\Model\Notification\NotificationCanceled;
use YooKassa\Model\Notification\NotificationSucceeded;
use YooKassa\Model\Notification\NotificationWaitingForCapture;
use YooKassa\Model\Payment\PaymentStatus;
use Telegram;

class PaymentController extends Controller
{
    protected $paymentService;

    public function __construct(PaymentService $paymentService)
    {
        $this->paymentService = $paymentService;
    }

    public function handleReturn(Request $request)
    {
        $transactionId = $request->query('transaction_id');

        if (!$transactionId) {
            return redirect()->route('courses')->with('payment_fail', [
                'title' => 'Ошибка возврата',
                'support_link_text' => 'службу заботы',
                'support_link_url' => route('contacts'),
            ]);
        }

        $transaction = PaymentTransaction::find($transactionId);

        if (!$transaction) {
            return redirect()->route('courses')->with('payment_fail', [
                'title' => 'Ошибка: Транзакция не найдена в системе.',
                'support_link_text' => 'службу заботы',
                'support_link_url' => route('contacts'),
            ]);
        }

        try {
            if ($transaction->status === 'succeeded') {
                return redirect()->route('courses')->with('payment_success', [
                    'title' => 'Добро пожаловать в увлекательный мир туризма!',
                    'body' => 'Мы рады сообщить, доступ к выбранному Вами пакету отправлен на Вашу почту.',
                    'support_link_text' => 'службу заботы',
                    'support_link_url' => route('contacts'),
                ]);

            } else {
                return redirect()->route('courses')->with('payment_fail', [
                    'title' => 'К сожалению, оплату не удалось провести. Пожалуйста, попробуйте снова.',
                    'support_link_text' => 'службу заботы',
                    'support_link_url' => route('contacts'),
                ]);
            }
        } catch (\Exception $exception) {
            return redirect()->route('courses')->with('payment_fail', [
                'title' => 'Системная ошибка',
                'body' => 'Произошла ошибка при проверке статуса платежа. Пожалуйста, свяжитесь с нами.',
                'support_link_text' => 'службу заботы',
                'support_link_url' => route('contacts'),
            ]);
        }
    }

    public function index(Request $request)
    {
        $status = $request->input('status');

        $query = PaymentTransaction::with(['user', 'package'])
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

    /**
     * @param Request $request
     * @param PaymentService $service
     * // * @return string
     * @throws \YooKassa\Common\Exceptions\ApiException
     * @throws \YooKassa\Common\Exceptions\BadApiRequestException
     * @throws \YooKassa\Common\Exceptions\ExtensionNotFoundException
     * @throws \YooKassa\Common\Exceptions\ForbiddenException
     * @throws \YooKassa\Common\Exceptions\InternalServerError
     * @throws \YooKassa\Common\Exceptions\NotFoundException
     * @throws \YooKassa\Common\Exceptions\ResponseProcessingException
     * @throws \YooKassa\Common\Exceptions\TooManyRequestsException
     * @throws \YooKassa\Common\Exceptions\UnauthorizedException
     */
    public function create(Request $request, PaymentService $service)
    {
        $amount = $request->input('amount');
        $description = 'Пакет ' . '"' . $request->input('course_name') . '"';

        $user = User::updateOrCreate(
            ['email' => $request->input('email')],
            [
                'full_name' => $request->input('full_name'),
                'phone_number' => $request->input('phone_number'),
                'password' => Hash::make(Str::random(12)),
            ]
        );

        $paymentTransaction = PaymentTransaction::create([
            'user_id' => $user->id,
            'package_id' => $request->input('package_id'),
            'amount' => $amount,
            'status' => 'pending',
            'payment_method' => null,
        ]);

        $paymentInfo = $service->createPayment(
            $amount,
            $description,
            [
                'user_id' => $user->id,
                'transaction_id' => $paymentTransaction->id,
                'package_id' => $request->input('package_id'),
                'course_name' => $description,
                'full_name' => $request->input('full_name'),
                'phone_number' => $request->input('phone_number'),
                'email' => $request->input('email'),
                'promo_code_id' => $request->input('promo_code_id'),
            ]
        );

        $paymentTransaction->payment_id = $paymentInfo['id'];
        $paymentTransaction->save();

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
            Log::warning('Transaction not found, but event acknowledged');
            return response()->json(['message' => 'Transaction not found, but event acknowledged'], 200);
        }

        if ($transaction->status === 'succeeded' && $paymentData['status'] === 'succeeded') {
            return response()->json(['message' => 'Already succeeded'], 200);
        }

        $transaction->payment_id = $paymentData['id'] ?? $transaction->payment_id;
        $transaction->save();

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
                Log::info("Unhandled payment status '{$paymentStatus}'");
                break;
        }

        return response()->json(['message' => 'Event processed successfully'], 200);
    }

    protected function handleSucceeded(PaymentTransaction $transaction, array $paymentData)
    {
        $promo_code_id = $paymentData['metadata']['promo_code_id'];

        $transaction->status = 'succeeded';
        $transaction->payment_method = $paymentData['payment_method']['type'] ?? 'unknown';
        $transaction->payment_at = Carbon::now();
        $transaction->promo_code_id = $promo_code_id;
        $transaction->save();

        if ($transaction->promo_code_id) {
            $promo = PromoCode::find($transaction->promo_code_id);
            $promo->is_used = true;
            if ($promo && is_null($promo->used_at)) {
                $promo->used_at = Carbon::now();
                if ($transaction->user_id) {
                    $promo->user_id = $transaction->user_id;
                }
                $promo->save();
            }
        }

        $package = $transaction->package;

        $packageLink = null;
        if ($package) {
            $packageLink = $package->content_link;
        }

        $courseName = $paymentData['metadata']['course_name'];
        $userName = $paymentData['metadata']['full_name'];
        $email = $paymentData['metadata']['email'];
        $link = $this->getTelegramLink($packageLink) ?? "#";

        app(NotificationService::class)->sendPurchaseNotification(
            $courseName ?? 'Unknown Package',
            $userName ?? 'Guest',
            $paymentData['metadata']['phone_number'] ?? 'Unknown',
            $email ?? 'Unknown',
            (float)$paymentData['amount']['value']
        );

        Mail::to($email)->queue(new PurchaseConfirmationMail(
            $courseName,
            $userName,
            $link,
        ));
    }

    protected function handleCanceled(PaymentTransaction $transaction, array $paymentData)
    {
        $transaction->status = 'canceled';
        $transaction->save();

        app(NotificationService::class)->sendPaymentFailedNotification(
            $paymentData['metadata']['course_name'] ?? 'Unknown Package',
            $paymentData['metadata']['full_name'] ?? 'Guest',
            $paymentData['metadata']['phone_number'] ?? 'Unknown',
            $paymentData['metadata']['email'] ?? 'Unknown',
            (float)$paymentData['amount']['value']
        );
    }

    protected function handleWaitingForCapture(PaymentTransaction $transaction, array $paymentData)
    {
        $transaction->status = PaymentStatus::WAITING_FOR_CAPTURE;

        $client = new Client();
        $client->setAuth(
            config('services.yookassa.shop_id'),
            config('services.yookassa.secret_key')
        );

        try {
            $captureResponse = $client->capturePayment(
                [
                    'amount' => [
                        'value' => $paymentData['amount']['value'],
                        'currency' => $paymentData['amount']['currency'],
                    ],
                ],
                $paymentData['id'],
                uniqid('capture_', true)
            );

            if ($captureResponse->getStatus() === 'succeeded') {
                $transaction->status = PaymentStatus::SUCCEEDED;
                $transaction->save();
            } else {
                Log::warning(
                    "Capture attempt for Payment ID {$paymentData['id']} failed. Status: " .
                    $captureResponse->getStatus()
                );
            }
        } catch (\Exception $e) {
            Log::error(
                "Error during YooKassa payment capture for ID {$paymentData['id']}: " .
                $e->getMessage()
            );
        }
    }

    public function getTelegramLink($chatId)
    {
        $parameters = [
            'chat_id' => $chatId,
            'member_limit' => 1,
            'name' => 'one_time_link',
        ];

        $response = Telegram::createChatInviteLink($parameters);
        return $response->invite_link;
    }
}
