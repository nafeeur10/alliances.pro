<?php

namespace App\Http\Controllers\Api\Marketing;

use App\Http\Controllers\Api\Marketing\Concerns\CachesMarketingResponses;
use App\Http\Controllers\Controller;
use App\Models\Marketing\SiteSetting;
use Illuminate\Http\JsonResponse;

class GetSettings extends Controller
{
    use CachesMarketingResponses;

    public function __invoke(): JsonResponse
    {
        return $this->cached('settings.map', function (): array {
            $map = [];
            SiteSetting::all()->each(function (SiteSetting $row) use (&$map): void {
                $map[$row->key] = [
                    'value' => $row->castedValue(),
                    'group' => $row->group,
                    'type' => $row->type,
                ];
            });
            return $map;
        });
    }
}
