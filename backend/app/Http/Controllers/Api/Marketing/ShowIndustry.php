<?php

namespace App\Http\Controllers\Api\Marketing;

use App\Http\Controllers\Api\Marketing\Concerns\CachesMarketingResponses;
use App\Http\Controllers\Controller;
use App\Http\Resources\Marketing\IndustryResource;
use App\Models\Marketing\Industry;
use Illuminate\Http\JsonResponse;

class ShowIndustry extends Controller
{
    use CachesMarketingResponses;

    public function __invoke(string $slug): JsonResponse
    {
        return $this->cached("industry:{$slug}", function () use ($slug): array {
            $industry = Industry::published()->where('slug', $slug)->firstOrFail();
            return IndustryResource::make($industry)->resolve();
        });
    }
}
