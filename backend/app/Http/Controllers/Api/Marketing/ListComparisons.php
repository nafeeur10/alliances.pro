<?php

namespace App\Http\Controllers\Api\Marketing;

use App\Http\Controllers\Api\Marketing\Concerns\CachesMarketingResponses;
use App\Http\Controllers\Controller;
use App\Models\Marketing\Comparison;
use Illuminate\Http\JsonResponse;

class ListComparisons extends Controller
{
    use CachesMarketingResponses;

    public function __invoke(): JsonResponse
    {
        return $this->cached('comparisons.index.summary', fn (): array =>
            Comparison::published()
                ->orderBy('competitor_name')
                ->get(['id', 'slug', 'competitor_name', 'headline', 'seo_description'])
                ->toArray(),
        );
    }
}
