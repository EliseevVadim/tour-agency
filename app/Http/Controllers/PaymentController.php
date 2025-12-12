<?php

namespace App\Http\Controllers;

use App\Models\PaymentTransaction;
use App\Models\User;
use App\Services\NotificationService;
use App\Services\PaymentService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use YooKassa\Client;
use YooKassa\Client\BaseClient;
use App\Enums\NotificationEventType;
use YooKassa\Model\Notification\NotificationCanceled;
use YooKassa\Model\Notification\NotificationSucceeded;
use YooKassa\Model\Notification\NotificationWaitingForCapture;
use YooKassa\Model\Payment\PaymentStatus;

//use YooKassa\Model\NotificationEventType;
//use YooKassa\Model\PaymentStatus;

class PaymentController extends Controller
{
    public function index()
    {
        return view('payment.index');
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
        $amount = $request['amount'];
        $description = 'Пакет ' . '"' . $request['course_name'] . '"';

        $user = User::updateOrCreate(
            ['email' => $request['email']],
            [
                'first_name' => $request['first_name'],
                'last_name' => $request['last_name'],
                'phone_number' => $request['phone_number'],
                'password' => Hash::make(Str::random(12)),
            ]
        );

        $payment_transaction = PaymentTransaction::create([
            'user_id' => $user->id,
            'package_id' => $request['package_id'],
            'amount' => $amount,
            'status' => 'pending',
            'payment_method' => 'unknown',
        ]);

        return $service->createPayment($amount, $description, [
            'user_id' => $user->id,
            'transaction_id' => $payment_transaction->id,
            'package_id' => $request['package_id'],
            'course_name' => $description,
            'first_name' => $request['first_name'],
            'last_name' => $request['last_name'],
            'phone_number' => $request['phone_number'],
            'email' => $request['email'],
        ]);
    }

    public function callback(Request $request)
    {
        $source = $request->getContent();
        $requestBody = json_decode($source, true);
        $paymentData = $requestBody['object'] ?? null;

        if (!$paymentData || !isset($paymentData['status'])) {
            return response()->json(['message' => 'Invalid notification structure'], 400);
        }

        $transactionId = (int)($paymentData['metadata']['transaction_id'] ?? 0);
        $transaction = $transactionId ? PaymentTransaction::find($transactionId) : null;

        if (!$transaction) {
            return response()->json(['message' => 'Transaction not found, but event acknowledged'], 200);
        }

        $paymentStatus = $paymentData['status'];

        switch ($paymentStatus) {
            case 'succeeded':
                $this->handleSucceeded($transaction, $paymentData);
                break;

            case 'canceled':
                $transaction->status = 'cancelled';
                $transaction->save();
                break;

            case 'waiting_for_capture':
                $this->handleWaitingForCapture($transaction, $paymentData);
                break;

            default:
                Log::info("Unhandled payment status '{$paymentStatus}' for transaction {$transactionId}");
                break;
        }

        return response()->json(['message' => 'Event processed successfully'], 200);
    }

    protected function handleSucceeded(PaymentTransaction $transaction, array $paymentData)
    {
        $metadata = $paymentData['metadata'];
        $payment_method = $paymentData['payment_method'];

        $courseName = $metadata['course_name'] ?? 'Unknown Package';
        $userName = trim(($metadata['first_name'] ?? '') . ' ' . ($metadata['last_name'] ?? ''));
        $userName = $userName ?: 'Guest';

        $amount = (float)($paymentData['amount']['value'] ?? 0.0);

        app(NotificationService::class)->sendPurchaseNotification(
            $courseName,
            $userName,
            $amount
        );

        $transaction->payment_method = $payment_method['type'];
        $transaction->status = 'completed';
        $transaction->payment_at = Carbon::now();
        $transaction->save();
    }

    protected function handleWaitingForCapture(PaymentTransaction $transaction, array $paymentData)
    {
        $transaction->status = PaymentStatus::WAITING_FOR_CAPTURE;
        $transaction->payment_id = $paymentData['id'];
        $transaction->payment_at = Carbon::now();
        $transaction->save();

        $client = new Client();
        $shopId = config('services.yookassa.shop_id');
        $secretKey = config('services.yookassa.secret_key');

        if (!$shopId || !$secretKey) {
            Log::error("YooKassa credentials missing for capture in config.");
            return;
        }

        $client->setAuth($shopId, $secretKey);

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
                Log::warning("Capture attempt for Payment ID {$paymentData['id']} failed. Status: " . $captureResponse->getStatus());
            }
        } catch (\Exception $e) {
            Log::error("Error during YooKassa payment capture for ID {$paymentData['id']}: " . $e->getMessage());
        }
    }
}
