<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $super = User::create([
            'role' => 'admin',
            'avatar' => null,
            'name' => 'Admin',
            'email' => 'admin@admin.com',
            'password' => Hash::make('password'),
        ]);

        $roleSuperAdmin = Role::create(['name' => 'superadmin']);
        $permissions = [
            [
                'group_name' => 'Appearance',
                'permissions' => [
                    'about',
                    'blog-posts',
                    'blog-categories',
                    'blog-tags',
                    'faq',
                    'features',
                    'team',
                    'language',
                    'menu',
                    'custom-page',
                    'partners',
                    'seo',
                    'testimonials',
                    'events',
                    'event-orders',
                    'theme-setting',
                ]
            ],
            [
                'group_name' => 'Site Settings',
                'permissions' => [
                    'page-settings',
                    'admin',
                    'developer-settings',
                    'roles',
                    'currency',
                    'locations',
                    'qualifications',
                ]
            ],
            [
                'group_name' => 'User Logs',
                'permissions' => [
                    'apps',
                    'contacts',
                    'customer',
                    'device',
                    'notification',
                    'schedule',
                    'templates',
                    'message-transactions',
                    'deposit-logs',
                ]
            ],
            [
                'group_name' => 'SAAS Functionalities',
                'permissions' => [
                    'cron-job',
                    'gateways',
                    'order',
                    'subscriptions',
                    'support',
                    'companies',
                    'candidates',
                    'company-reviews',
                    'expert-levels',
                    'faq-category',
                    'kyc-methods',
                    'kyc-requests',
                    'message-requests',
                    'customers',
                    'investors',
                    'refer-history',
                    'commission-history',
                    'payouts',
                ]
            ],
        ];

        foreach ($permissions as $key => $row) {
            foreach ($row['permissions'] as $per) {
                $permission = Permission::create(['name' => $per, 'group_name' => $row['group_name']]);
                $roleSuperAdmin->givePermissionTo($permission);
                $permission->assignRole($roleSuperAdmin);
                $super->assignRole($roleSuperAdmin);
            }
        }
    }
}
