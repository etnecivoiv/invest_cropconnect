<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class EmployerUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::insert([
            array('id' => '3', 'name' => 'Mr. Jhon', 'username' => 'example-company', 'avatar' => NULL, 'role' => 'employer', 'email' => 'company@mail.com', 'phone' => NULL, 'address' => NULL, 'category_id' => '23', 'meta' => '{"company":{"name":"Abc Company","size":"51-120","year_of_establishment":"2010","address":"Tongi, Gazipur, Dhaka","intro":"Creativity is our passion."},"contact":{"name":"Mr Jhon","designation":"CEO","email":"ceo@company.com","mobile":"0123456789"},"business":{"description":"This is example Business Description","license_no":"123456789","rl_no":654320,"site_url":"https:\\/\\/www.wotyrokyb.us"},"social":{"linkedin":null,"twitter":null,"facebook":null,"instagram":null}}', 'status' => '1', 'employment' => NULL, 'provider' => NULL, 'provider_id' => NULL, 'plan' => NULL, 'plan_id' => NULL, 'email_verified_at' => NULL, 'kyc_verified_at' => NULL, 'will_expire' => NULL, 'password' => '$2y$10$N39vVByX5RJFAAFePMKJBOYW7HJyg2JUTqGuGIvE.DF5jv/Ovj4hu', 'deleted_at' => NULL, 'remember_token' => NULL, 'created_at' => '2023-09-23 04:55:34', 'updated_at' => '2023-09-23 04:57:57')

        ]);

        /**
         * @var \App\Models\User $employer 
         */
        $employer = User::find(3);

        // add company related others table data here
    }
}
