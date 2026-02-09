<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;
use YooKassa\Client;

class PaymentService
{
    public function getClient(): Client
    {
        $client = new Client();
        $client->setAuth(
            config('services.yookassa.shop_id'),
            config('services.yookassa.secret_key')
        );

        return $client;
    }

    function formatToE164(string $phoneNumber): string
    {
        $digits = preg_replace('/[^0-9]+/', '', $phoneNumber);
        $e164Number = $digits;
        if (strpos($digits, '8') === 0) {
            $e164Number = '7' . substr($digits, 1);
        }
        elseif (strpos($digits, '7') === 0) {
            $e164Number = $digits;
        }
        elseif (strlen($digits) === 10) {
            $e164Number = '7' . $digits;
        }

        return $e164Number;
    }

    /**
     * @param float $amount
     * @param string $description
     * @param array $options
     * @return string
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
    public function createPayment(float $amount, string $description, array $options = []): array {
        $idempotenceKey = uniqid('', true);
        $client = $this->getClient();

        $dataPayment = [
            'amount' => [
                'value'    => $amount,
                'currency' => 'RUB',
            ],
            'capture'   => true,
            'confirmation' => [
                'type'       => 'redirect',
                'return_url' => route('payment.return', ['transaction_id' => $options['transaction_id']])
            ],
            'receipt' => [
                'items' => [
                    [
                        'description' => $description,
                        'quantity' => 1.00,
                        'amount' => [
                            'value' => $amount,
                            'currency' => 'RUB'
                        ],
                        'vat_code' => 7,
                        'payment_subject' => 'service',
                        'payment_mode' => 'full_payment',
                        'measure' => 'piece'
                    ]
                ],
                'tax_system_code' => 2,
                'customer' => [
                    'email' => $options['email'],
                    'phone' => $this->formatToE164($options['phone_number']),
                ]
            ],

            'metadata' => [
                'package_id'     => $options['package_id'],
                'course_name'    => $options['course_name'],
                'full_name'      => $options['full_name'],
                'phone_number'   => $options['phone_number'],
                'email'          => $options['email'],
                'transaction_id' => $options['transaction_id'],
                'promo_code_id' => $options['promo_code_id'],
                'discount_type' => $options['discount_type'],
                'discount_value' => $options['discount_value'],
            ],
            'description' => $description,
        ];

        $formattedData = json_encode($dataPayment, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

        Log::info('Платежные данные перед отправкой:', [
            'payment_data' => $formattedData,
            'idempotence_key' => $idempotenceKey,
        ]);

        Log::info('start create payment');
        $payment = $client->createPayment($dataPayment, $idempotenceKey);
        Log::info('end create payment');

        return [
            'url' => $payment->getConfirmation()->getConfirmationUrl(),
            'id'  => $payment->getId(),
        ];
    }
}
