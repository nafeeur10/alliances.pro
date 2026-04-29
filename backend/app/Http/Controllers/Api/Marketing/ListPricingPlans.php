<?php

namespace App\Http\Controllers\Api\Marketing;

use App\Http\Controllers\Api\Marketing\Concerns\CachesMarketingResponses;
use App\Http\Controllers\Controller;
use App\Http\Resources\Marketing\PricingPlanResource;
use App\Models\Marketing\PricingPlan;
use Illuminate\Http\JsonResponse;

class ListPricingPlans extends Controller
{
    use CachesMarketingResponses;

    public function __invoke(): JsonResponse
    {
        return $this->cached('pricing-plans.index', fn (): array =>
            PricingPlanResource::collection(PricingPlan::published()->orderBy('order')->get())->resolve(),
        );
    }
}
