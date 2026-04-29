<?php

use App\Models\User;
use Spatie\Permission\Models\Role;

it('redirects guests to the admin login', function (): void {
    $this->get('/admin')->assertRedirect('/admin/login');
});

it('forbids non-admin authenticated users', function (): void {
    $user = User::create([
        'name' => 'Plain User',
        'email' => 'plain@example.com',
        'password' => bcrypt('secret'),
        'email_verified_at' => now(),
    ]);

    $this->actingAs($user)
        ->get('/admin')
        ->assertForbidden();
});

it('allows users with super_admin role', function (): void {
    Role::firstOrCreate(['name' => 'super_admin', 'guard_name' => 'web']);

    $user = User::create([
        'name' => 'Admin',
        'email' => 'admin-test@example.com',
        'password' => bcrypt('secret'),
        'email_verified_at' => now(),
    ]);
    $user->assignRole('super_admin');

    $this->actingAs($user)
        ->get('/admin')
        ->assertOk();
});
