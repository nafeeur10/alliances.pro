<?php

namespace App\Http\Controllers\Api\Marketing;

use App\Http\Controllers\Api\Marketing\Concerns\CachesMarketingResponses;
use App\Http\Controllers\Controller;
use App\Http\Resources\Marketing\BlogPostResource;
use App\Models\Marketing\BlogPost;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ListBlogPosts extends Controller
{
    use CachesMarketingResponses;

    public function __invoke(Request $request): JsonResponse
    {
        $page = max(1, (int) $request->query('page', 1));
        $perPage = min(50, max(1, (int) $request->query('per_page', 15)));

        return $this->cached("blog.index:p{$page}:n{$perPage}", function () use ($perPage): array {
            $paginator = BlogPost::published()
                ->orderByDesc('published_at')
                ->paginate($perPage);

            return [
                'items' => BlogPostResource::collection($paginator->items())->resolve(),
                'pagination' => [
                    'current_page' => $paginator->currentPage(),
                    'per_page' => $paginator->perPage(),
                    'total' => $paginator->total(),
                    'last_page' => $paginator->lastPage(),
                ],
            ];
        });
    }
}
