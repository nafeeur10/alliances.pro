<?php

namespace App\Http\Controllers\Api\Marketing;

use App\Http\Controllers\Api\Marketing\Concerns\CachesMarketingResponses;
use App\Http\Controllers\Controller;
use App\Http\Resources\Marketing\PageResource;
use App\Models\Marketing\Page;
use Illuminate\Http\JsonResponse;

class ShowPage extends Controller
{
    use CachesMarketingResponses;

    public function __invoke(string $slug): JsonResponse
    {
        return $this->cached("page:{$slug}", function () use ($slug): array {
            $page = Page::published()
                ->where('slug', $slug)
                ->with(['sections' => fn ($q) => $q->where('is_visible', true)->orderBy('order')])
                ->firstOrFail();
            return PageResource::make($page)->resolve();
        });
    }
}
