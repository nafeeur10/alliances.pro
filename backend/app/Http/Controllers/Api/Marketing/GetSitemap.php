<?php

namespace App\Http\Controllers\Api\Marketing;

use App\Http\Controllers\Api\Marketing\Concerns\CachesMarketingResponses;
use App\Http\Controllers\Controller;
use App\Models\Marketing\BlogPost;
use Illuminate\Http\JsonResponse;

/**
 * Marketing pages now live as static routes in the Next.js app, so the
 * sitemap only needs to enumerate dynamic blog posts. The frontend's
 * `app/sitemap.ts` adds the static routes ( /, /about, /pricing, /help, etc. )
 * directly.
 */
class GetSitemap extends Controller
{
    use CachesMarketingResponses;

    public function __invoke(): JsonResponse
    {
        return $this->cached('sitemap.urls', function (): array {
            $urls = [];

            foreach (BlogPost::published()->get(['slug', 'updated_at']) as $row) {
                $urls[] = ['path' => "/blog/{$row->slug}", 'updated_at' => optional($row->updated_at)->toIso8601String()];
            }

            return $urls;
        });
    }
}
