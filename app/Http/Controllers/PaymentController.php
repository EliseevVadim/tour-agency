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
        $amount        = $request->input('amount');
        $description   = 'Пакет ' . '"' . $request->input('course_name') . '"';

        $user = User::updateOrCreate(
            ['email' => $request->input('email')],
            [
                'full_name'    => $request->input('full_name'),
                'phone_number' => $request->input('phone_number'),
                'password'     => Hash::make(Str::random(12)),
            ]
        );

        $paymentTransaction = PaymentTransaction::create([
            'user_id'      => $user->id,
            'package_id'   => $request->input('package_id'),
            'amount'       => $amount,
            'status'       => 'pending',
            'payment_method' => 'unknown',
        ]);

        $paymentInfo = $service->createPayment(
            $amount,
            $description,
            [
                'user_id'        => $user->id,
                'transaction_id' => $paymentTransaction->id,
                'package_id'     => $request->input('package_id'),
                'course_name'    => $description,
                'full_name'      => $request->input('full_name'),
                'phone_number'   => $request->input('phone_number'),
                'email'          => $request->input('email'),
            ]
        );

        $paymentTransaction->payment_id = $paymentInfo['id'];
        $paymentTransaction->save();

        return $paymentInfo['url'];
    }

    public function callback(Request $request)
    {
        $source      = $request->getContent();
        $requestBody = json_decode($source, true);
        $paymentData = $requestBody['object'] ?? null;

        if (!$paymentData || !isset($paymentData['status'], $paymentData['id'])) {
            return response()->json(['message' => 'Invalid notification structure'], 400);
        }

        Log::info("Received payment status: {$paymentData['status']} for payment ID: {$paymentData['id']}");
        $transaction = PaymentTransaction::where('payment_id', '=', $paymentData['id'])->first();

        if (!$transaction) {
            Log::warning('Transaction not found, but event acknowledged');
            return response()->json(['message' => 'Transaction not found, but event acknowledged'], 200);
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
        $transaction->status = 'completed';
        $transaction->payment_method = $paymentData['payment_method']['type'] ?? 'unknown';
        $transaction->payment_at = Carbon::now();
        $transaction->save();

        app(NotificationService::class)->sendPurchaseNotification(
            $paymentData['metadata']['course_name'] ?? 'Unknown Package',
            $paymentData['metadata']['full_name'] ?? 'Guest',
            $paymentData['metadata']['phone_number'] ?? 'Unknown',
            $paymentData['metadata']['email'] ?? 'Unknown',
            (float)$paymentData['amount']['value']
        );
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
                        'value'    => $paymentData['amount']['value'],
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
}
