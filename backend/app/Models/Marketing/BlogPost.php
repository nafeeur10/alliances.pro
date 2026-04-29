<?php

namespace App\Models\Marketing;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class BlogPost extends Model implements HasMedia
{
    /** @use HasFactory<\Database\Factories\Marketing\BlogPostFactory> */
    use HasFactory;
    use HasSlug;
    use InteractsWithMedia;

    protected $table = 'marketing_blog_posts';

    protected $fillable = [
        'slug',
        'title',
        'excerpt',
        'body',
        'cover_image',
        'author_name',
        'category',
        'tags',
        'reading_minutes',
        'is_published',
        'published_at',
        'seo_title',
        'seo_description',
    ];

    protected function casts(): array
    {
        return [
            'tags' => 'array',
            'is_published' => 'boolean',
            'published_at' => 'datetime',
            'reading_minutes' => 'integer',
        ];
    }

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('title')
            ->saveSlugsTo('slug')
            ->doNotGenerateSlugsOnUpdate();
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_published', true)
            ->where(function (Builder $q): void {
                $q->whereNull('published_at')->orWhere('published_at', '<=', now());
            });
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
