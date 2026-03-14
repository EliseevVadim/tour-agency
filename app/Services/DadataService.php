<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use RuntimeException;

class DadataService
{
    private string $baseUrl = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';

    public function suggestStreets(string $query, ?string $region = null, ?string $city = null, int $count = 10): array {

        $query = trim($query);
        $region = trim((string)$region);
        $city = trim((string)$city);

        if ($query === '') {
            return [];
        }

        $fullQuery = implode(', ', array_filter([$city, $region, $query]));

        $payload = [
            "query" => $fullQuery,
            "count" => min(max($count, 1), 20),
            "from_bound" => ["value" => "street"],
            "to_bound" => ["value" => "street"]
        ];

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
        $region = trim((string)$region);
        $city = trim((string)$city);

        if ($street === '') {
            return [];
        }

        $fullQuery = implode(', ', array_filter([
            $city,
            $region,
            $street . ' ' . $query
        ]));

        $payload = [
            "query" => $fullQuery,
            "count" => min(max($count, 1), 20),
            "from_bound" => ["value" => "house"],
            "to_bound" => ["value" => "house"]
        ];

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
            $house = trim((string)($item['data']['house'] ?? ''));
            if ($house === '') {
                continue;
            }

            $houses[] = $house;
        }

        return array_values(array_unique($houses));
    }
}
