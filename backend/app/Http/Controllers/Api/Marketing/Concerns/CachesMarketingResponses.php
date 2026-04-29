<?php

namespace App\Http\Controllers\Api\Marketing\Concerns;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;

trait CachesMarketingResponses
{
    protected function cached(string $key, callable $callback, int $ttlSeconds = 300): JsonResponse
    {
        $cacheTags = $this->cacheStoreSupportsTags();
        $cachedAt = Carbon::now()->toIso8601String();

        $payload = $cacheTags
            ? Cache::tags(['marketing'])->remember($key, $ttlSeconds, fn (): array => [
                'data' => value($callback),
                'cached_at' => Carbon::now()->toIso8601String(),
            ])
            : Cache::remember("marketing:{$key}", $ttlSeconds, fn (): array => [
                'data' => value($callback),
                'cached_at' => Carbon::now()->toIso8601String(),
            ]);

        return response()->json([
            'data' => $payload['data'],
            'meta' => [
                'cached_at' => $payload['cached_at'] ?? $cachedAt,
            ],
        ]);
    }

    protected function cacheStoreSupportsTags(): bool
    {
        $store = Cache::getStore();
        return method_exists($store, 'tags');
    }
}
