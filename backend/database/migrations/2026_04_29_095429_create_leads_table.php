<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('marketing_leads', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('email');
            $table->string('company')->nullable();
            $table->string('team_size')->nullable();
            $table->text('message')->nullable();
            $table->enum('source', ['contact_form', 'demo_form', 'newsletter', 'waitlist'])
                ->default('contact_form');
            $table->string('waitlist_for')->nullable();
            $table->string('ip_address', 45)->nullable();
            $table->string('user_agent')->nullable();
            $table->boolean('consent_given')->default(false);
            $table->timestamp('notified_at')->nullable();
            $table->timestamp('processed_at')->nullable();
            $table->timestamps();

            $table->index(['source', 'created_at']);
            $table->index('email');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('marketing_leads');
    }
};
