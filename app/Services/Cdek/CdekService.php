<?php

namespace App\Services\Cdek;

use App\Support\PhoneNormalizer;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use RuntimeException;
use Throwable;

class CdekService
{
    public string $baseUrl;

    public function __construct()
    {
        $this->baseUrl = config('cdek.test')
            ? 'https://api.edu.cdek.ru/v2'
            : 'https://api.cdek.ru/v2';
    }

    public function normalizePhone(string $phone): string
    {
        return PhoneNormalizer::normalizeRu($phone);
    }

    public function calculateByTariff(array $payload, int $tariffCode): array
    {
        $payload['tariff_code'] = $tariffCode;

        return $this->wrap(function () use ($payload) {
            return $this->request('post', '/calculator/tariff', $payload);
        });
    }

    public function getPickupOffices(int $cityCode): array
    {
        return $this->wrap(function () use ($cityCode) {
            return $this->request('get', '/deliverypoints', [], [
                'city_code' => $cityCode,
            ]);
        }, []);
    }

    public function createOrder(array $payload): array
    {
        return $this->wrap(function () use ($payload) {
            return $this->request('post', '/orders', $payload);
        });
    }

    public function getOrderInfo(string $imNumber): array
    {
        return $this->wrap(function () use ($imNumber) {
            return $this->request('get', '/orders', [], [
                'im_number' => $imNumber,
            ]);
        });
    }

    public function printBarcodes(array $orders, int $copyCount = 1, string $format = 'A6', string $lang = 'RUS'): array
    {
        return $this->wrap(function () use ($orders, $copyCount, $format, $lang) {
            return $this->request('post', '/print/barcodes', [
                'orders' => $orders,
                'copy_count' => $copyCount,
                'format' => $format,
                'lang' => $lang,
            ]);
        });
    }

    public function getBarcodeInfo(string $uuid): array
    {
        return $this->wrap(function () use ($uuid) {
            return $this->request('get', '/print/barcodes/' . $uuid);
        });
    }

    public function downloadBarcodePdf(string $uuid): array
    {
        try {
            $token = $this->getToken();
            $url = $this->baseUrl . '/print/barcodes/' . $uuid . '.pdf';

            $response = Http::withToken($token)
                ->withHeaders(['Accept' => 'application/pdf'])
                ->get($url);

            if ($response->status() === 401) {
                $this->forgetToken();

                $response = Http::withToken($this->getToken())
                    ->withHeaders(['Accept' => 'application/pdf'])
                    ->get($url);
            }

            $contentType = $response->header('Content-Type');
            $body = $response->body();

            if (!$response->successful()) {
                return [
                    'success' => false,
                    'errors' => [$this->extractErrorMessage($this->safeJson($response), $body)],
                    'data' => null,
                    'status' => $response->status(),
                    'content_type' => $contentType,
                ];
            }

            if (mb_strpos(mb_strtolower((string) $contentType), 'application/pdf') === false) {
                return [
                    'success' => false,
                    'errors' => ['СДЭК не вернул PDF'],
                    'data' => null,
                    'status' => $response->status(),
                    'content_type' => $contentType,
                ];
            }

            return [
                'success' => true,
                'errors' => [],
                'data' => $body,
                'status' => $response->status(),
                'content_type' => $contentType,
            ];
        } catch (Throwable $e) {
            return [
                'success' => false,
                'errors' => [$e->getMessage()],
                'data' => null,
                'status' => null,
                'content_type' => null,
            ];
        }
    }

    public function getToken(): string
    {
        $cacheKey = 'cdek_access_token_' . (config('cdek.test') ? 'test' : 'prod');

        return Cache::remember($cacheKey, now()->addMinutes(50), function () {
            $response = Http::asForm()->post($this->baseUrl . '/oauth/token', [
                'grant_type' => 'client_credentials',
                'client_id' => config('cdek.account'),
                'client_secret' => config('cdek.secure'),
            ]);

            if (!$response->successful()) {
                throw new RuntimeException(
                    $this->extractErrorMessage($this->safeJson($response), $response->body())
                );
            }

            $token = $response->json('access_token');

            if (!$token) {
                throw new RuntimeException('Не удалось получить access_token СДЭК');
            }

            return $token;
        });
    }

    protected function forgetToken(): void
    {
        $cacheKey = 'cdek_access_token_' . (config('cdek.test') ? 'test' : 'prod');
        Cache::forget($cacheKey);
    }

    protected function request(string $method, string $uri, array $data = [], array $query = []): array
    {
        $url = $this->baseUrl . $uri;

        $http = Http::withToken($this->getToken())
            ->acceptJson()
            ->contentType('application/json');

        $response = $this->sendRequest($http, $method, $url, $data, $query);

        if ($response->status() === 401) {
            $this->forgetToken();

            $http = Http::withToken($this->getToken())
                ->acceptJson()
                ->contentType('application/json');

            $response = $this->sendRequest($http, $method, $url, $data, $query);
        }

        if (!$response->successful()) {
            throw new RuntimeException(
                $this->extractErrorMessage($this->safeJson($response), $response->body())
            );
        }

        return $this->safeJson($response) ?: [];
    }

    protected function sendRequest($http, string $method, string $url, array $data = [], array $query = [])
    {
        $method = mb_strtolower($method);

        if ($method === 'get') {
            return $http->get($url, $query);
        }

        if ($method === 'post') {
            return $http->post($url, $data);
        }

        if ($method === 'put') {
            return $http->put($url, $data);
        }

        if ($method === 'patch') {
            return $http->patch($url, $data);
        }

        if ($method === 'delete') {
            return $http->delete($url, $data);
        }

        throw new RuntimeException('Неподдерживаемый HTTP-метод: ' . $method);
    }

    protected function wrap(callable $callback, $fallback = null): array
    {
        try {
            return [
                'success' => true,
                'errors' => [],
                'data' => $callback(),
            ];
        } catch (Throwable $e) {
            return [
                'success' => false,
                'errors' => [$e->getMessage()],
                'data' => $fallback,
            ];
        }
    }

    protected function safeJson($response): ?array
    {
        try {
            return $response->json();
        } catch (Throwable $e) {
            return null;
        }
    }

    protected function extractErrorMessage($json, ?string $rawBody): string
    {
        if (is_array($json)) {
            if (!empty($json['message']) && is_string($json['message'])) {
                return $json['message'];
            }

            if (!empty($json['requests'][0]['errors'][0]['message'])) {
                return $json['requests'][0]['errors'][0]['message'];
            }

            if (!empty($json['errors'][0]['message'])) {
                return $json['errors'][0]['message'];
            }

            if (!empty($json['errors'][0]) && is_string($json['errors'][0])) {
                return $json['errors'][0];
            }
        }

        return $rawBody ?: 'Ошибка запроса к СДЭК';
    }

    public function extractOrderUuid(array $data): ?string
    {
        $value = data_get($data, 'entity.uuid');
        return $value ? (string) $value : null;
    }

    public function extractCdekNumber(array $data): ?string
    {
        $value = data_get($data, 'entity.cdek_number');
        return $value !== null ? (string) $value : null;
    }

    public function extractOrderRequestState(array $data): ?string
    {
        $value = data_get($data, 'requests.0.state');
        return $value ? (string) $value : null;
    }

    public function extractPrintStatus(array $data): ?string
    {
        $value = data_get($data, 'entity.statuses.0.code');
        return $value ? (string) $value : null;
    }
}
