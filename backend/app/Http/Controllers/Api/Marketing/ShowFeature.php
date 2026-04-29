<?php

namespace App\Http\Controllers\Api\Marketing;

use App\Http\Controllers\Api\Marketing\Concerns\CachesMarketingResponses;
use App\Http\Controllers\Controller;
use App\Http\Resources\Marketing\FeatureResource;
use App\Models\Marketing\Feature;
use Illuminate\Http\JsonResponse;

class ShowFeature extends Controller
{
    use CachesMarketingResponses;

    public function __invoke(string $slug): JsonResponse
    {
        return $this->cached("feature:{$slug}", function () use ($slug): array {
            $feature = Feature::published()->where('slug', $slug)->firstOrFail();
            return FeatureResource::make($feature)->resolve();
        });
    }
}
