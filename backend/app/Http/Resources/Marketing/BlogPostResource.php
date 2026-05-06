<?php

namespace App\Http\Resources\Marketing;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BlogPostResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $isShow = $request->routeIs('marketing.blog.show');

        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'title' => $this->title,
            'excerpt' => $this->excerpt,
            'body' => $this->when($isShow, $this->body),
            'content_blocks' => $this->when($isShow, $this->content_blocks ?? []),
            'cover_image' => $this->cover_image,
            'og_image' => $this->og_image,
            'author_name' => $this->author?->name ?? $this->author_name,
            'author' => $this->whenLoaded('author', fn () => $this->author ? [
                'id' => $this->author->id,
                'name' => $this->author->name,
            ] : null),
            'category' => $this->category,
            'tags' => $this->tags ?? [],
            'reading_minutes' => (int) $this->reading_minutes,
            'views_count' => (int) $this->views_count,
            'is_featured' => (bool) $this->is_featured,
            'is_pinned' => (bool) $this->is_pinned,
            'status' => $this->status,
            'visibility' => $this->visibility,
            'allow_indexing' => (bool) ($this->allow_indexing ?? true),
            'show_toc' => (bool) ($this->show_toc ?? true),
            'allow_comments' => (bool) ($this->allow_comments ?? true),
            'published_at' => optional($this->published_at)->toIso8601String(),
            'seo_title' => $this->seo_title,
            'seo_description' => $this->seo_description,
            'focus_keyword' => $this->focus_keyword,
        ];
    }
}
