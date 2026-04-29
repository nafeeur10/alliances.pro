<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('marketing_features', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name');
            $table->string('tagline')->nullable();
            $table->longText('body')->nullable();
            $table->string('icon')->nullable();
            $table->unsignedInteger('order')->default(0);
            $table->boolean('is_published')->default(true);
            $table->string('seo_title')->nullable();
            $table->string('seo_description', 500)->nullable();
            $table->timestamps();

            $table->index(['is_published', 'order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('marketing_features');
    }
};
