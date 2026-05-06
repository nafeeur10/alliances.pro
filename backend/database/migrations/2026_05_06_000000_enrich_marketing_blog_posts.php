<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('marketing_blog_posts', function (Blueprint $table): void {
            $table->foreignId('author_id')->nullable()->after('author_name')
                ->constrained('users')->nullOnDelete();

            $table->unsignedBigInteger('views_count')->default(0)->after('reading_minutes');

            $table->boolean('is_pinned')->default(false)->after('is_featured')->index();

            $table->string('status', 20)->default('draft')->after('is_pinned')->index();
            $table->string('visibility', 20)->default('public')->after('status')->index();

            $table->boolean('allow_comments')->default(true)->after('visibility');
            $table->boolean('show_toc')->default(true)->after('allow_comments');
            $table->boolean('allow_indexing')->default(true)->after('show_toc');

            $table->string('focus_keyword')->nullable()->after('seo_description');
            $table->string('og_image')->nullable()->after('focus_keyword');

            $table->json('content_blocks')->nullable()->after('body');

            $table->softDeletes();
        });

        // Backfill `status` from existing is_published / published_at so the new
        // column matches what's already on the surface for the 14 seeded posts.
        DB::table('marketing_blog_posts')
            ->where('is_published', true)
            ->where(function ($q): void {
                $q->whereNull('published_at')->orWhere('published_at', '<=', now());
            })
            ->update(['status' => 'published']);

        DB::table('marketing_blog_posts')
            ->where('is_published', true)
            ->where('published_at', '>', now())
            ->update(['status' => 'scheduled']);
    }

    public function down(): void
    {
        Schema::table('marketing_blog_posts', function (Blueprint $table): void {
            $table->dropSoftDeletes();

            $table->dropColumn([
                'content_blocks',
                'og_image',
                'focus_keyword',
                'allow_indexing',
                'show_toc',
                'allow_comments',
            ]);

            $table->dropIndex(['visibility']);
            $table->dropColumn('visibility');

            $table->dropIndex(['status']);
            $table->dropColumn('status');

            $table->dropIndex(['is_pinned']);
            $table->dropColumn('is_pinned');

            $table->dropColumn('views_count');

            $table->dropForeign(['author_id']);
            $table->dropColumn('author_id');
        });
    }
};
