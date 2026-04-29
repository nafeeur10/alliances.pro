<?php

namespace App\Models\Marketing;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Testimonial extends Model implements HasMedia
{
    /** @use HasFactory<\Database\Factories\Marketing\TestimonialFactory> */
    use HasFactory;
    use InteractsWithMedia;

    protected $table = 'marketing_testimonials';

    protected $fillable = [
        'quote',
        'author_name',
        'author_role',
        'author_company',
        'author_avatar',
        'rating',
        'industry_tag',
        'is_published',
        'order',
    ];

    protected function casts(): array
    {
        return [
            'rating' => 'integer',
            'is_published' => 'boolean',
            'order' => 'integer',
        ];
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_published', true);
    }
}
