<?php

namespace App\Http\Controllers\Api\Marketing;

use App\Http\Controllers\Api\Marketing\Concerns\CachesMarketingResponses;
use App\Http\Controllers\Controller;
use App\Http\Resources\Marketing\BlogPostResource;
use App\Models\Marketing\BlogPost;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;

class ListBlogPageData extends Controller
{
    use CachesMarketingResponses;

    /** Posts shown per category section on /blog. */
    private const PER_CATEGORY = 6;

    /** Posts shown in the "Latest articles" row. */
    private const LATEST_LIMIT = 6;

    /**
     * Map JSON response keys to the canonical category strings stored on
     * BlogPost.category. Mirrors BlogPostForm::CATEGORIES.
     */
    private const CATEGORY_KEYS = [
        'case_study' => 'Case Study',
        'marketing_tips' => 'Marketing Tips',
        'product_update' => 'Product Update',
        'crm_analysis' => 'CRM Analysis',
    ];

    public function __invoke(): JsonResponse
    {
        return $this->cached('blog.page-data', function (): array {
            $featured = BlogPost::featured()->orderByDesc('published_at')->first();
            $featuredId = $featured?->id;

            $latest = BlogPost::published()
                ->when($featuredId, fn ($q) => $q->whereKeyNot($featuredId))
                ->orderByDesc('published_at')
                ->limit(self::LATEST_LIMIT)
                ->get();

            $payload = [
                'featured' => $featured ? BlogPostResource::make($featured)->resolve() : null,
                'latest' => $this->resolveCollection($latest),
            ];

            foreach (self::CATEGORY_KEYS as $jsonKey => $category) {
                $posts = BlogPost::published()
                    ->where('category', $category)
                    ->orderByDesc('published_at')
                    ->limit(self::PER_CATEGORY)
                    ->get();

                $payload[$jsonKey] = $this->resolveCollection($posts);
            }

            return $payload;
        });
    }

    /**
     * @param  Collection<int, BlogPost>  $posts
     * @return array<int, array<string, mixed>>
     */
    private function resolveCollection(Collection $posts): array
    {
        return BlogPostResource::collection($posts)->resolve();
    }
}
