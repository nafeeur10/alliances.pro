<?php

namespace App\Http\Controllers\Api\Marketing;

use App\Http\Controllers\Api\Marketing\Concerns\CachesMarketingResponses;
use App\Http\Controllers\Controller;
use App\Http\Resources\Marketing\IntegrationResource;
use App\Models\Marketing\Integration;
use Illuminate\Http\JsonResponse;

class ListIntegrations extends Controller
{
    use CachesMarketingResponses;

    public function __invoke(): JsonResponse
    {
        return $this->cached('integrations.index.grouped', function (): array {
            $items = Integration::published()->orderBy('category')->orderBy('order')->get();
            return $items
                ->groupBy(fn (Integration $i): string => $i->category ?? 'Other')
                ->map(fn ($group) => IntegrationResource::collection($group)->resolve())
                ->toArray();
        });
    }
}
