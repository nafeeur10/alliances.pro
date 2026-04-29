<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('marketing_integrations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('logo')->nullable();
            $table->string('category')->nullable();
            $table->text('description')->nullable();
            $table->string('link_url')->nullable();
            $table->boolean('is_published')->default(true);
            $table->unsignedInteger('order')->default(0);
            $table->timestamps();

            $table->index(['is_published', 'category', 'order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('marketing_integrations');
    }
};
