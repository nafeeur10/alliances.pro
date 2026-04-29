<?php

namespace App\Http\Controllers\Api\Marketing;

use App\Http\Controllers\Api\Marketing\Concerns\CachesMarketingResponses;
use App\Http\Controllers\Controller;
use App\Http\Resources\Marketing\BlogPostResource;
use App\Models\Marketing\BlogPost;
use Illuminate\Http\JsonResponse;

class ShowBlogPost extends Controller
{
    use CachesMarketingResponses;

    public function __invoke(string $slug): JsonResponse
    {
        return $this->cached("blog:{$slug}", function () use ($slug): array {
            $post = BlogPost::published()->where('slug', $slug)->firstOrFail();
            return BlogPostResource::make($post)->resolve();
        });
    }
}
