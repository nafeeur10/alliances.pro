<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('marketing_testimonials', function (Blueprint $table) {
            $table->id();
            $table->text('quote');
            $table->string('author_name');
            $table->string('author_role')->nullable();
            $table->string('author_company')->nullable();
            $table->string('author_avatar')->nullable();
            $table->unsignedTinyInteger('rating')->default(5);
            $table->string('industry_tag')->nullable();
            $table->boolean('is_published')->default(true);
            $table->unsignedInteger('order')->default(0);
            $table->timestamps();

            $table->index(['is_published', 'order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('marketing_testimonials');
    }
};
