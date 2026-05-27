<?php

namespace App\Services\YooKassa;

use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class YooKassaService
{
    public function createPayment(array $payload, $idempotenceKey = null)
    {
        $response = $this->request('post', '/payments', $payload, $idempotenceKey ?: (string)Str::uuid());

        return $this->formatResponse($response);
    }

    public function getPayment($paymentId)
    {
        $response = $this->request('get', '/payments/' . $paymentId);
        return $this->formatResponse($response);
    }

    public function buildPaymentPayload(array $data)
    {
        $payload = [
            'amount' => [
                'value' => number_format((float)$data['amount'], 2, '.', ''),
                'currency' => config('service.yookassa.currency', 'RUB'),
            ],
            'capture' => true,
            'confirmation' => [
                'type' => 'redirect',
                'return_url' =>  route('shop.payment.return')
            ],
            'description' => $data['description'],
            'metadata' => $data['metadata'] ?? new \stdClass(),
        ];

        if (!empty($data['receipt'])) {
            $payload['receipt'] = $data['receipt'];
        }

        return $payload;
    }

    protected function request($method, $uri, array $payload = array(), $idempotenceKey = null)
    {
        $request = Http::baseUrl(rtrim(config('services.yookassa.base_url'), '/'))
            ->withBasicAuth(
                (string)config('services.yookassa_shop.shop_id'),
                (string)config('services.yookassa_shop.secret_key')
            )
            ->acceptJson()
            ->contentType('application/json')
            ->timeout(20);

        if ($idempotenceKey) {
            $request = $request->withHeaders([
                'Idempotence-Key' => $idempotenceKey,
            ]);
        }

        if ($method === 'get') {
            return $request->get($uri);
        }

        if ($method === 'post') {
            return $request->post($uri, $payload);
        }

        return $request->send(strtoupper($method), $uri, [
            'json' => $payload,
        ]);
    }

    protected function formatResponse(Response $response)
    {
        $json = $response->json();

        if ($response->successful()) {
            return [
                'success' => true,
                'data' => $json,
            ];
        }

        return [
            'success' => false,
            'errors' => [
                data_get($json, 'description')
                    ?: data_get($json, 'type')
                    ?: 'YooKassa request failed',
            ],
            'status' => $response->status(),
            'data' => $json,
        ];
    }
}
