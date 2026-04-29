<?php

namespace App\Http\Resources\Marketing;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BlogPostResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'title' => $this->title,
            'excerpt' => $this->excerpt,
            'body' => $this->when($request->routeIs('marketing.blog.show'), $this->body),
            'cover_image' => $this->cover_image,
            'author_name' => $this->author_name,
            'category' => $this->category,
            'tags' => $this->tags ?? [],
            'reading_minutes' => (int) $this->reading_minutes,
            'published_at' => optional($this->published_at)->toIso8601String(),
            'seo_title' => $this->seo_title,
            'seo_description' => $this->seo_description,
        ];
    }
}
