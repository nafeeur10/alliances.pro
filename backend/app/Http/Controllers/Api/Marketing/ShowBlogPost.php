<?php

namespace App\Http\Controllers\Api\Marketing;

use App\Http\Controllers\Api\Marketing\Concerns\CachesMarketingResponses;
use App\Http\Controllers\Controller;
use App\Http\Resources\Marketing\BlogPostResource;
use App\Models\Marketing\BlogPost;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

class ShowBlogPost extends Controller
{
    use CachesMarketingResponses;

    public function __invoke(string $slug): JsonResponse
    {
        // Increment views_count once per request, then bust the cached payload
        // so the next read reflects the new total. `increment()` runs a single
        // UPDATE without firing model events, so the saving observer doesn't run.
        $updated = BlogPost::published()->where('slug', $slug)->increment('views_count');

        if ($updated > 0) {
            $this->forgetCachedPayload("blog:{$slug}");
        }

        return $this->cached("blog:{$slug}", function () use ($slug): array {
            $post = BlogPost::published()->with('author:id,name')->where('slug', $slug)->firstOrFail();
            return BlogPostResource::make($post)->resolve();
        });
    }

    private function forgetCachedPayload(string $key): void
    {
        if ($this->cacheStoreSupportsTags()) {
            Cache::tags(['marketing'])->forget($key);
            return;
        }

        Cache::forget("marketing:{$key}");
    }
}
