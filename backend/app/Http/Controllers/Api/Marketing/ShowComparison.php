<?php

namespace App\Http\Controllers\Api\Marketing;

use App\Http\Controllers\Api\Marketing\Concerns\CachesMarketingResponses;
use App\Http\Controllers\Controller;
use App\Http\Resources\Marketing\ComparisonResource;
use App\Models\Marketing\Comparison;
use Illuminate\Http\JsonResponse;

class ShowComparison extends Controller
{
    use CachesMarketingResponses;

    public function __invoke(string $slug): JsonResponse
    {
        return $this->cached("comparison:{$slug}", function () use ($slug): array {
            $comparison = Comparison::published()->where('slug', $slug)->firstOrFail();
            return ComparisonResource::make($comparison)->resolve();
        });
    }
}
