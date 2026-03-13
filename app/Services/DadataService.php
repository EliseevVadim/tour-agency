<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use RuntimeException;

class DadataService
{
    private string $baseUrl = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';

    public function suggestStreets(string $query, ?string $region = null, ?string $city = null, int $count = 10): array
    {
        $query = trim($query);

        if ($query === '') {
            return [];
        }

        $payload = [
            'query' => $query,
            'count' => min(max($count, 1), 20),
            'from_bound' => ['value' => 'street'],
            'to_bound' => ['value' => 'street'],
        ];

        $location = array_filter([
            'region' => $region ? trim($region) : null,
            'city' => $city ? trim($city) : null,
        ], static function ($value) {
            return $value !== null && $value !== '';
        });

        if (!empty($location)) {
            $payload['locations'] = [$location];
        }

        $response = Http::timeout(10)
            ->withHeaders([
                'Authorization' => 'Token ' . config('services.dadata.token'),
                'Accept' => 'application/json',
                'Content-Type' => 'application/json',
            ])
            ->post($this->baseUrl, $payload);

        if (!$response->successful()) {
            throw new RuntimeException('Ошибка запроса к Dadata: ' . $response->body());
        }

        $suggestions = $response->json('suggestions') ?? [];
        $streets = [];

        foreach ($suggestions as $item) {
            $street = $item['data']['street_with_type'] ?? null;

            if (!$street) {
                continue;
            }

            $streets[] = $street;
        }

        return array_values(array_unique($streets));
    }

    public function suggestBuildings(string $query, string $street, ?string $region = null, ?string $city = null, int $count = 10): array {
        $query = trim($query);
        $street = trim($street);
        $city = trim((string) $city);
        $region = trim((string) $region);

        if ($street === '') {
            return [];
        }

        $parts = array_filter([
            $city !== '' ? $city : null,
            $street,
            $query !== '' ? $query : null,
        ], static function ($value) {
            return $value !== null && $value !== '';
        });

        $fullQuery = implode(' ', $parts);

        $payload = [
            'query' => $fullQuery,
            'count' => min(max($count, 1), 20),
            'from_bound' => ['value' => 'house'],
            'to_bound' => ['value' => 'house'],
        ];

        if ($region !== '' || $city !== '') {
            $location = array_filter([
                'region' => $region !== '' ? $region : null,
                'city' => $city !== '' ? $city : null,
            ], static function ($value) {
                return $value !== null && $value !== '';
            });

            if (!empty($location)) {
                $payload['locations'] = [$location];
            }
        }

        $response = Http::timeout(10)
            ->withHeaders([
                'Authorization' => 'Token ' . config('services.dadata.token'),
                'Accept' => 'application/json',
                'Content-Type' => 'application/json',
            ])
            ->post($this->baseUrl, $payload);

        if (!$response->successful()) {
            throw new RuntimeException('Ошибка запроса к Dadata: ' . $response->body());
        }

        $suggestions = $response->json('suggestions') ?? [];
        $houses = [];

        foreach ($suggestions as $item) {
            $house = trim((string) ($item['data']['house'] ?? ''));

            if ($house === '') {
                continue;
            }

            $houses[] = $house;
        }

        return array_values(array_unique($houses));
    }
}
