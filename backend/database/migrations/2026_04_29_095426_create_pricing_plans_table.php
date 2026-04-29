<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('marketing_pricing_plans', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->unsignedInteger('monthly_price_cents')->default(0);
            $table->unsignedInteger('yearly_price_cents')->default(0);
            $table->string('currency', 3)->default('USD');
            $table->text('description')->nullable();
            $table->string('cta_label')->default('Start free trial');
            $table->string('cta_url')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_published')->default(true);
            $table->unsignedInteger('order')->default(0);
            $table->json('features')->nullable();
            $table->json('limits')->nullable();
            $table->string('comparison_note')->nullable();
            $table->string('external_signup_url')->nullable();
            $table->timestamps();

            $table->index(['is_published', 'order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('marketing_pricing_plans');
    }
};
