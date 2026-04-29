<?php

namespace App\Models\Marketing;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Integration extends Model
{
    /** @use HasFactory<\Database\Factories\Marketing\IntegrationFactory> */
    use HasFactory;
    use HasSlug;

    protected $table = 'marketing_integrations';

    protected $fillable = [
        'name',
        'slug',
        'logo',
        'category',
        'description',
        'link_url',
        'is_published',
        'order',
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
}
