<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Retire the page_sections + pages "headless CMS" tables. Marketing copy is
 * now owned in the Next.js frontend (`@data/*.ts` + per-page hard-coded
 * defaults), and the Filament resources have been removed. This migration
 * drops the now-unused tables.
 *
 * Down: recreate empty tables with the same shape so a rollback doesn't
 * crash the schema. Original seed data is gone — re-seeding would have to
 * use the historical MarketingContentSeeder which is also removed.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::dropIfExists('marketing_page_sections');
        Schema::dropIfExists('marketing_pages');
    }

    public function down(): void
    {
        Schema::create('marketing_pages', function (Blueprint $table): void {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->string('seo_title')->nullable();
            $table->text('seo_description')->nullable();
            $table->boolean('is_published')->default(false);
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
        });

        Schema::create('marketing_page_sections', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('marketing_page_id')->constrained('marketing_pages')->cascadeOnDelete();
            $table->string('key');
            $table->string('component')->nullable();
            $table->json('payload')->nullable();
            $table->unsignedInteger('order')->default(0);
            $table->boolean('is_visible')->default(true);
            $table->timestamps();
            $table->unique(['marketing_page_id', 'key']);
        });
    }
};
