<?php

return [
    'account' => env('CDEK_ACCOUNT'),
    'secure' => env('CDEK_SECURE'),
    'test' => env('CDEK_TEST', true),

    'from_location_code' => (int) env('CDEK_FROM_LOCATION_CODE', 44),

    'tariffs' => [
        'door' => (int) env('CDEK_TARIFF_DOOR', 137),
        'pickup' => (int) env('CDEK_TARIFF_PICKUP', 136),
    ],
];
