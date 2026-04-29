<?php

namespace App\Http\Controllers\Api\Marketing;

use App\Http\Controllers\Api\Marketing\Concerns\CachesMarketingResponses;
use App\Http\Controllers\Controller;
use App\Http\Resources\Marketing\FeatureResource;
use App\Models\Marketing\Feature;
use Illuminate\Http\JsonResponse;

class ListFeatures extends Controller
{
    use CachesMarketingResponses;

    public function __invoke(): JsonResponse
    {
        return $this->cached('features.index', fn (): array =>
            FeatureResource::collection(Feature::published()->orderBy('order')->get())->resolve(),
        );
    }
}
