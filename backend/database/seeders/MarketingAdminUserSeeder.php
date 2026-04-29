<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class MarketingAdminUserSeeder extends Seeder
{
    public function run(): void
    {
        $superAdmin = Role::firstOrCreate(['name' => 'super_admin', 'guard_name' => 'web']);

        $marketingEditor = Role::firstOrCreate(['name' => 'marketing_editor', 'guard_name' => 'web']);

        $marketingEntities = [
            'Page', 'PageSection', 'Feature', 'Industry', 'PricingPlan',
            'Faq', 'Testimonial', 'Comparison', 'Integration', 'Lead',
            'SiteSetting', 'BlogPost',
        ];
        $verbs = ['ViewAny', 'View', 'Create', 'Update', 'Delete', 'DeleteAny', 'Restore', 'RestoreAny', 'ForceDelete', 'ForceDeleteAny', 'Replicate', 'Reorder'];

        $permissionNames = [];
        foreach ($marketingEntities as $entity) {
            foreach ($verbs as $verb) {
                $permissionNames[] = "{$verb}:{$entity}";
            }
        }

        $existing = Permission::whereIn('name', $permissionNames)->where('guard_name', 'web')->pluck('name')->all();
        $marketingEditor->syncPermissions($existing);

        $superAdmin->syncPermissions(Permission::where('guard_name', 'web')->pluck('name')->all());

        $admin = User::updateOrCreate(
            ['email' => 'admin@alliances.pro'],
            [
                'name' => 'Marketing Admin',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ],
        );
        $admin->syncRoles(['super_admin']);
    }
}
