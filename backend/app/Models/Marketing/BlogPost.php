<?php

namespace App\Models\Marketing;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class BlogPost extends Model implements HasMedia
{
    public const STATUS_DRAFT = 'draft';
    public const STATUS_PUBLISHED = 'published';
    public const STATUS_SCHEDULED = 'scheduled';
    public const STATUS_ARCHIVED = 'archived';

    public const STATUSES = [
        self::STATUS_DRAFT => 'Draft',
        self::STATUS_PUBLISHED => 'Published',
        self::STATUS_SCHEDULED => 'Scheduled',
        self::STATUS_ARCHIVED => 'Archived',
    ];

    public const VISIBILITY_PUBLIC = 'public';
    public const VISIBILITY_PRIVATE = 'private';
    public const VISIBILITY_MEMBERS = 'members';

    public const VISIBILITIES = [
        self::VISIBILITY_PUBLIC => 'Public',
        self::VISIBILITY_PRIVATE => 'Private',
        self::VISIBILITY_MEMBERS => 'Members only',
    ];

    /** @use HasFactory<\Database\Factories\Marketing\BlogPostFactory> */
    use HasFactory;
    use HasSlug;
    use InteractsWithMedia;
    use SoftDeletes;

    protected $table = 'marketing_blog_posts';

    protected $fillable = [
        'slug',
        'title',
        'excerpt',
        'body',
        'content_blocks',
        'cover_image',
        'author_id',
        'author_name',
        'category',
        'tags',
        'reading_minutes',
        'views_count',
        'is_published',
        'is_featured',
        'is_pinned',
        'status',
        'visibility',
        'allow_comments',
        'show_toc',
        'allow_indexing',
        'published_at',
        'seo_title',
        'seo_description',
        'focus_keyword',
        'og_image',
    ];

    protected function casts(): array
    {
        return [
            'tags' => 'array',
            'content_blocks' => 'array',
            'is_published' => 'boolean',
            'is_featured' => 'boolean',
            'is_pinned' => 'boolean',
            'allow_comments' => 'boolean',
            'show_toc' => 'boolean',
            'allow_indexing' => 'boolean',
            'published_at' => 'datetime',
            'reading_minutes' => 'integer',
            'views_count' => 'integer',
        ];
    }

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('title')
            ->saveSlugsTo('slug')
            ->doNotGenerateSlugsOnUpdate();
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    /**
     * Auto-calculate reading_minutes from body word count when blank or stale.
     * Runs only when body changed or reading_minutes is unset/zero.
     */
    protected static function booted(): void
    {
        static::saving(function (self $post): void {
            $needsRecalc = $post->isDirty('body') || empty($post->reading_minutes);
            if (! $needsRecalc) {
                return;
            }

            $words = $post->body ? str_word_count(strip_tags((string) $post->body)) : 0;
            $post->reading_minutes = max(1, (int) ceil($words / 200));
        });
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query
            ->where(function (Builder $q): void {
                $q->where('status', self::STATUS_PUBLISHED)
                    ->orWhere('is_published', true);
            })
            ->where(function (Builder $q): void {
                $q->whereNull('published_at')->orWhere('published_at', '<=', now());
            })
            ->where('visibility', self::VISIBILITY_PUBLIC);
    }

    public function scopeFeatured(Builder $query): Builder
    {
        return $this->scopePublished($query)->where('is_featured', true);
    }

    public function scopeDraft(Builder $query): Builder
    {
        return $query->where('status', self::STATUS_DRAFT);
    }

    public function scopeScheduled(Builder $query): Builder
    {
        return $query->where('status', self::STATUS_SCHEDULED)
            ->orWhere(function (Builder $q): void {
                $q->where('is_published', true)->where('published_at', '>', now());
            });
    }

    public function scopeArchived(Builder $query): Builder
    {
        return $query->where('status', self::STATUS_ARCHIVED);
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
