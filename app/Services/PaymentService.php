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

        $payment = $client->createPayment([
            'amount' => [
                'value'    => $amount,
                'currency' => 'RUB',
            ],
            'capture'   => true,
            'confirmation' => [
                'type'       => 'redirect',
                'return_url' => route('payment.return', ['transaction_id' => $options['transaction_id']])
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
        ], $idempotenceKey);

        return [
            'url' => $payment->getConfirmation()->getConfirmationUrl(),
            'id'  => $payment->getId(),
        ];
    }
}
