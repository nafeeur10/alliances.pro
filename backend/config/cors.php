<?php

$marketingOrigins = array_filter(
    array_map('trim', explode(',', (string) env('APP_MARKETING_ORIGINS', ''))),
);

if ($marketingOrigins === []) {
    $marketingOrigins = [
        'http://localhost',
        'http://localhost:3000',
        'https://alliances.pro',
        'https://www.alliances.pro',
    ];
}

return [
    'paths' => ['api/v1/marketing/*'],

    'allowed_methods' => ['GET', 'POST', 'OPTIONS'],

    'allowed_origins' => $marketingOrigins,

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['Accept', 'Content-Type', 'Origin', 'X-Requested-With'],

    'exposed_headers' => [],

    'max_age' => 60 * 60 * 24,

    'supports_credentials' => false,
];
