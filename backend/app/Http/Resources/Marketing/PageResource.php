<?php

namespace App\Http\Resources\Marketing;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PageResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'title' => $this->title,
            'meta_title' => $this->meta_title,
            'meta_description' => $this->meta_description,
            'og_image' => $this->og_image,
            'is_published' => (bool) $this->is_published,
            'published_at' => optional($this->published_at)->toIso8601String(),
            'sections' => PageSectionResource::collection($this->whenLoaded('sections')),
        ];
    }
}
