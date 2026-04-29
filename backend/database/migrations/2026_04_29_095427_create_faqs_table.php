<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('marketing_faqs', function (Blueprint $table) {
            $table->id();
            $table->string('question');
            $table->longText('answer');
            $table->string('category')->nullable();
            $table->unsignedInteger('order')->default(0);
            $table->boolean('is_published')->default(true);
            $table->timestamps();

            $table->index(['is_published', 'category', 'order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('marketing_faqs');
    }
};
