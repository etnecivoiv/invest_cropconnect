<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\PayoutMethod;
class PayoutmethodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $payout_methods = array(
            array('id' => '1','currency_name' => 'USD','name' => 'Paypal','image' => '/uploads/24/03/UO0gnOQNgOa5EK5krMsA.png','min_limit' => '100','max_limit' => '20000','delay' => '1','charge_type' => 'percentage','fixed_charge' => '1','percent_charge' => '5','data' => '[{"type": "email", "label": "Email"}]','instruction' => '<p>Double-check whether the email is valid or not if any kind of your business fails we will not take responsibility for it.</p>','status' => '1','created_at' => '2024-03-25 21:58:04','updated_at' => '2024-03-25 22:03:58'),
            array('id' => '2','currency_name' => 'USD','name' => 'Payoneer','image' => '/uploads/24/03/AoibVO7LJyDVZJzhILY5.webp','min_limit' => '50','max_limit' => '5000','delay' => '1','charge_type' => 'fixed','fixed_charge' => '10','percent_charge' => NULL,'data' => '[{"type": "text", "label": "Name"}, {"type": "email", "label": "Email"}]','instruction' => '<p>Double-check whether the information is valid or not if any kind of your business fails we will not take responsibility for it.</p>','status' => '1','created_at' => '2024-03-25 21:59:31','updated_at' => '2024-03-25 22:00:57')
          );
        PayoutMethod::insert($payout_methods);
    }
}
