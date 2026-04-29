<?php

namespace App\Http\Controllers\Api\Marketing;

use App\Http\Controllers\Api\Marketing\Concerns\CachesMarketingResponses;
use App\Http\Controllers\Controller;
use App\Http\Resources\Marketing\IndustryResource;
use App\Models\Marketing\Industry;
use Illuminate\Http\JsonResponse;

class ListIndustries extends Controller
{
    use CachesMarketingResponses;

    public function __invoke(): JsonResponse
    {
        return $this->cached('industries.index', fn (): array =>
            IndustryResource::collection(Industry::published()->orderBy('order')->get())->resolve(),
        );
    }
}
