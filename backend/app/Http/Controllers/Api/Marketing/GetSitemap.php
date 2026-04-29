<?php

namespace App\Http\Controllers\Api\Marketing;

use App\Http\Controllers\Api\Marketing\Concerns\CachesMarketingResponses;
use App\Http\Controllers\Controller;
use App\Models\Marketing\BlogPost;
use App\Models\Marketing\Comparison;
use App\Models\Marketing\Feature;
use App\Models\Marketing\Industry;
use App\Models\Marketing\Page;
use Illuminate\Http\JsonResponse;

class GetSitemap extends Controller
{
    use CachesMarketingResponses;

    public function __invoke(): JsonResponse
    {
        return $this->cached('sitemap.urls', function (): array {
            $urls = [];

            foreach (Page::published()->get(['slug', 'updated_at']) as $page) {
                $urls[] = [
                    'path' => $page->slug === 'home' ? '/' : "/{$page->slug}",
                    'updated_at' => optional($page->updated_at)->toIso8601String(),
                ];
            }

            foreach (Feature::published()->get(['slug', 'updated_at']) as $row) {
                $urls[] = ['path' => "/features/{$row->slug}", 'updated_at' => optional($row->updated_at)->toIso8601String()];
            }
            foreach (Industry::published()->get(['slug', 'updated_at']) as $row) {
                $urls[] = ['path' => "/industries/{$row->slug}", 'updated_at' => optional($row->updated_at)->toIso8601String()];
            }
            foreach (Comparison::published()->get(['slug', 'updated_at']) as $row) {
                $urls[] = ['path' => "/compare/{$row->slug}", 'updated_at' => optional($row->updated_at)->toIso8601String()];
            }
            foreach (BlogPost::published()->get(['slug', 'updated_at']) as $row) {
                $urls[] = ['path' => "/blog/{$row->slug}", 'updated_at' => optional($row->updated_at)->toIso8601String()];
            }

            return $urls;
        });
    }
}
