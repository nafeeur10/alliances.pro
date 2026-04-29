<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('marketing_page_sections', function (Blueprint $table) {
            $table->id();
            $table->foreignId('page_id')->constrained('marketing_pages')->cascadeOnDelete();
            $table->string('key');
            $table->unsignedInteger('order')->default(0);
            $table->enum('type', [
                'hero', 'sponsors', 'benefits', 'features', 'services',
                'trust', 'testimonial', 'team', 'pricing', 'community',
                'contact', 'faq', 'newsletter', 'custom',
            ]);
            $table->json('payload')->nullable();
            $table->boolean('is_visible')->default(true);
            $table->timestamps();

            $table->index(['page_id', 'order']);
            $table->unique(['page_id', 'key']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('marketing_page_sections');
    }
};
