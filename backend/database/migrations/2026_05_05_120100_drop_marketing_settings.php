<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Retire the marketing_settings table. Site-wide brand bits (logo, social
 * handles, contact email, SEO defaults) live in the Next.js frontend
 * (`@data/footer.ts`, `@data/contact.ts`, `lib/seo.ts`). Nothing on the
 * frontend was reading the /settings endpoint, so this drop is safe.
 *
 * Down: recreate an empty table with the original shape so a rollback
 * doesn't crash schema. Original seed data is gone.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::dropIfExists('marketing_settings');
    }

    public function down(): void
    {
        Schema::create('marketing_settings', function (Blueprint $table): void {
            $table->id();
            $table->string('key')->unique();
            $table->string('group')->default('general');
            $table->string('label')->nullable();
            $table->json('value')->nullable();
            $table->string('type')->default('string');
            $table->timestamps();
        });
    }
};
