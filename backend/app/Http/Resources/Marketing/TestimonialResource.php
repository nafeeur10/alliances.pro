<?php

namespace App\Http\Resources\Marketing;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TestimonialResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'quote' => $this->quote,
            'author' => [
                'name' => $this->author_name,
                'role' => $this->author_role,
                'company' => $this->author_company,
                'avatar' => $this->author_avatar,
            ],
            'rating' => (int) $this->rating,
            'industry_tag' => $this->industry_tag,
            'order' => (int) $this->order,
        ];
    }
}
