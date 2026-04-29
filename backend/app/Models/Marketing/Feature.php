<?php

namespace App\Models\Marketing;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Feature extends Model
{
    /** @use HasFactory<\Database\Factories\Marketing\FeatureFactory> */
    use HasFactory;
    use HasSlug;

    protected $table = 'marketing_features';

    protected $fillable = [
        'slug',
        'name',
        'tagline',
        'body',
        'icon',
        'order',
        'is_published',
        'seo_title',
        'seo_description',
    ];

    protected function casts(): array
    {
        return [
            'is_published' => 'boolean',
            'order' => 'integer',
        ];
    }

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->saveSlugsTo('slug')
            ->doNotGenerateSlugsOnUpdate();
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_published', true);
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
