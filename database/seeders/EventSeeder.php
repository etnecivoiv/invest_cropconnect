<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Event;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $events = array(
            array('id' => '1','title' => 'Farmer training','body' => 'Empowering farmers with knowledge and skills is key to fostering sustainable agriculture practices and driving rural prosperity. The upcoming "Cultivating Success" Farmer Training Event aims to equip farmers with the tools, techniques, and insights needed to thrive in today\'s dynamic agricultural landscape. This description provides an overview of the event\'s objectives, agenda, and benefits for participants.','preview' => '/uploads/24/03/zKBOP4q5YqlityFZMQPv.jpg','slug' => 'farmer-training','start_at' => '2024-06-12 14:00:00','location' => '132, Kingston, New York.','email' => 'contact@email.com','phone' => '01234567890','total_seat' => '100','seat_prefix' => 'GROW-','seat_limit' => '1','is_free' => '0','fee_amount' => '5','is_active' => '1','guests' => '[{"name":"Jhone Doe","designation":"Market specialist","preview":"\\/uploads\\/24\\/03\\/RBAFEh1nfVOEmmNJ14BL.png"},{"name":"Jane Doe","designation":"Top Investor","preview":"\\/uploads\\/24\\/03\\/VzuihruoWNcueO8Wb3dL.png"},{"name":"Mark Doe","designation":"CEO","preview":"\\/uploads\\/24\\/03\\/wX3mqkF9ev2GgeVX443H.png"}]','meta' => NULL,'created_at' => '2024-03-25 20:56:59','updated_at' => '2024-03-25 20:56:59'),
            array('id' => '2','title' => 'Investment Training','body' => 'Empowering farmers with knowledge and skills is key to fostering sustainable agriculture practices and driving rural prosperity. The upcoming "Cultivating Success" Farmer Training Event aims to equip farmers with the tools, techniques, and insights needed to thrive in today\'s dynamic agricultural landscape. This description provides an overview of the event\'s objectives, agenda, and benefits for participants.','preview' => '/uploads/24/03/GbX3jCSmgZiR0wIYpsnI.jpg','slug' => 'investment-training','start_at' => '2024-05-13 14:00:00','location' => '132, Kingston, New York.','email' => 'contact@email.com','phone' => '01234567890','total_seat' => '1000','seat_prefix' => 'INT-','seat_limit' => '10','is_free' => '1','fee_amount' => '0','is_active' => '1','guests' => '[{"name":"Jhone","designation":"Market specialist","preview":"\\/uploads\\/24\\/03\\/sAmQ6AiMLtI3SuzswRzY.png"},{"name":"Mark Leo","designation":"Investment specialist","preview":"\\/uploads\\/24\\/03\\/80DFzWGGLzZ6gkvHyb4U.png"},{"name":"Jane Doe","designation":"Farmer","preview":"\\/uploads\\/24\\/03\\/DURqlfW9J8XUyTO6aWAL.png"}]','meta' => NULL,'created_at' => '2024-03-25 21:04:34','updated_at' => '2024-03-25 21:04:34'),
            array('id' => '3','title' => 'Advance Farming','body' => 'Empowering farmers with knowledge and skills is key to fostering sustainable agriculture practices and driving rural prosperity. The upcoming "Cultivating Success" Farmer Training Event aims to equip farmers with the tools, techniques, and insights needed to thrive in today\'s dynamic agricultural landscape. This description provides an overview of the event\'s objectives, agenda, and benefits for participants.','preview' => '/uploads/24/03/0gT5Lw2BpMggZvBiLbKF.jpg','slug' => 'advance-farming','start_at' => '2024-10-30 16:00:00','location' => '132, Kingston, New York.','email' => 'contact@email.com','phone' => '01234567890','total_seat' => '200','seat_prefix' => 'AFT-','seat_limit' => '1','is_free' => '0','fee_amount' => '5','is_active' => '1','guests' => '[{"name":"Mark Doe","designation":"CEO","preview":"\\/uploads\\/24\\/03\\/PeRrVfX2PY0jYG8l5otW.png"},{"name":"Jhone Doe","designation":"Top Investor","preview":"\\/uploads\\/24\\/03\\/5jswe4C5BePKNAwi7kZ0.png"},{"name":"Jane Lee","designation":"Farming  specialist","preview":"\\/uploads\\/24\\/03\\/zfQFJClENNU9YgC0bvDc.png"}]','meta' => NULL,'created_at' => '2024-03-25 21:07:34','updated_at' => '2024-03-25 21:07:34')
          );

        Event::insert($events); 
    }
}
