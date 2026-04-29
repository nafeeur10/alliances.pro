<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('marketing_comparisons', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('competitor_name');
            $table->string('headline')->nullable();
            $table->longText('body')->nullable();
            $table->text('winner_summary')->nullable();
            $table->json('comparison_table')->nullable();
            $table->string('seo_title')->nullable();
            $table->string('seo_description', 500)->nullable();
            $table->boolean('is_published')->default(false);
            $table->timestamps();

            $table->index('is_published');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('marketing_comparisons');
    }
};
