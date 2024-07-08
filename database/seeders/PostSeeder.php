<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Post;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $posts = array(
            array('id' => '1','title' => 'Why does your business need a chatbot?','slug' => 'why-does-your-business-need-a-chatbot','type' => 'faq','status' => '1','featured' => '1','lang' => 'en','created_at' => '2023-03-06 10:17:03','updated_at' => '2023-03-06 10:17:03'),
            array('id' => '2','title' => 'Do I need a credit card to sign up?','slug' => 'do-i-need-a-credit-card-to-sign-up','type' => 'faq','status' => '1','featured' => '1','lang' => 'en','created_at' => '2023-03-06 10:17:50','updated_at' => '2023-03-06 10:17:50'),
            array('id' => '4','title' => 'Darlene Robertson','slug' => 'Product Manager','type' => 'team','status' => '1','featured' => '1','lang' => 'en','created_at' => '2023-03-06 17:53:17','updated_at' => '2023-03-06 17:53:17'),
            array('id' => '5','title' => 'Bessie Cooper','slug' => 'Vp People','type' => 'team','status' => '1','featured' => '1','lang' => 'en','created_at' => '2023-03-06 17:54:06','updated_at' => '2023-03-06 17:54:06'),
            array('id' => '6','title' => 'Eleanor Pena','slug' => 'Head of Design','type' => 'team','status' => '1','featured' => '1','lang' => 'en','created_at' => '2023-03-06 17:54:44','updated_at' => '2023-03-06 17:54:44'),
            array('id' => '7','title' => 'Rhonda Ortiz','slug' => 'Founder & CO','type' => 'team','status' => '1','featured' => '1','lang' => 'en','created_at' => '2023-03-06 17:55:23','updated_at' => '2023-03-06 17:55:23'),
            array('id' => '9','title' => 'Harvesting Prosperity The Growth Potential of Agro-Investing','slug' => 'harvesting-prosperity-the-growth-potential-of-agro-investing','type' => 'blog','status' => '1','featured' => '1','lang' => 'en','created_at' => '2023-03-06 18:57:44','updated_at' => '2024-03-25 19:48:21'),
            array('id' => '10','title' => 'Exploring the Growth Potential of Agro-Investing','slug' => 'exploring-the-growth-potential-of-agro-investing','type' => 'blog','status' => '1','featured' => '1','lang' => 'en','created_at' => '2023-03-06 19:00:52','updated_at' => '2024-03-25 19:44:30'),
            array('id' => '12','title' => 'Keith Powers','slug' => 'Developer','type' => 'testimonial','status' => '1','featured' => '1','lang' => '5','created_at' => '2023-03-06 19:23:24','updated_at' => '2023-03-06 19:23:24'),
            array('id' => '13','title' => 'Mary','slug' => 'Digital Marketer','type' => 'testimonial','status' => '1','featured' => '1','lang' => '4','created_at' => '2023-03-06 19:24:12','updated_at' => '2023-10-16 18:00:53'),
            array('id' => '14','title' => 'Clinton Ramosup','slug' => 'Freelancer','type' => 'testimonial','status' => '1','featured' => '1','lang' => '4','created_at' => '2023-03-06 19:24:59','updated_at' => '2024-03-25 20:33:35'),
            array('id' => '15','title' => 'Financial Services','slug' => 'financial-services','type' => 'faq','status' => '1','featured' => '1','lang' => 'en','created_at' => '2023-03-06 19:30:09','updated_at' => '2023-03-06 19:30:09'),
            array('id' => '16','title' => 'How it will take impact for Food & Restaurants business.','slug' => 'how-it-will-take-impact-for-food-restaurants-business','type' => 'faq','status' => '1','featured' => '1','lang' => 'en','created_at' => '2023-03-06 19:31:09','updated_at' => '2023-03-06 19:31:09'),
            array('id' => '17','title' => 'Template messaging','slug' => 'template-messaging','type' => 'feature','status' => '1','featured' => '1','lang' => 'en','created_at' => '2023-03-06 22:24:43','updated_at' => '2023-03-06 22:24:43'),
            array('id' => '18','title' => 'Actions buttons','slug' => 'actions-buttons','type' => 'feature','status' => '1','featured' => '1','lang' => 'en','created_at' => '2023-03-06 23:15:36','updated_at' => '2023-03-06 23:16:21'),
            array('id' => '19','title' => 'Auto Responder (BOT)','slug' => 'auto-responder-bot','type' => 'feature','status' => '1','featured' => '1','lang' => 'en','created_at' => '2023-03-06 23:32:24','updated_at' => '2023-03-07 08:35:52'),
            array('id' => '20','title' => 'Schedule message','slug' => 'schedule-message','type' => 'feature','status' => '1','featured' => '0','lang' => 'en','created_at' => '2023-03-07 08:02:46','updated_at' => '2023-03-07 08:03:07'),
            array('id' => '21','title' => 'Bulk message','slug' => 'bulk-message','type' => 'feature','status' => '1','featured' => '0','lang' => 'en','created_at' => '2023-03-07 08:13:22','updated_at' => '2023-03-07 08:13:22'),
            array('id' => '22','title' => 'RESET API for App','slug' => 'reset-api-for-app','type' => 'feature','status' => '1','featured' => '0','lang' => 'en','created_at' => '2023-03-07 08:22:38','updated_at' => '2023-03-07 08:22:38'),
            array('id' => '23','title' => 'Automatically sync in real time','slug' => 'automatically-sync-in-real-time','type' => 'faq','status' => '1','featured' => '1','lang' => 'en','created_at' => '2023-04-09 19:39:14','updated_at' => '2024-03-25 20:01:41'),
            array('id' => '26','title' => 'Terms and conditions','slug' => 'terms-and-conditions','type' => 'page','status' => '1','featured' => '1','lang' => 'en','created_at' => '2023-04-09 19:40:59','updated_at' => '2023-04-09 19:40:59'),
            array('id' => '27','title' => 'Investing in Agro Ventures','slug' => 'investing-in-agro-ventures','type' => 'blog','status' => '1','featured' => '1','lang' => 'en','created_at' => '2023-10-12 09:42:51','updated_at' => '2024-03-25 11:16:37'),
          
            array('id' => '29','title' => 'Lesley Peterson','slug' => 'Pro Investor','type' => 'investor','status' => '1','featured' => '1','lang' => 'en','created_at' => '2023-10-16 18:22:28','updated_at' => '2024-03-25 20:30:56'),
            array('id' => '30','title' => 'Adele Williams','slug' => 'Pro Investor','type' => 'investor','status' => '1','featured' => '1','lang' => 'en','created_at' => '2024-03-18 18:29:35','updated_at' => '2024-03-25 20:30:40'),
            array('id' => '33','title' => 'The Rise of Agro-Investing in Sustainable Agriculture','slug' => 'the-rise-of-agro-investing-in-sustainable-agriculture','type' => 'blog','status' => '1','featured' => '1','lang' => 'en','created_at' => '2024-03-25 20:10:48','updated_at' => '2024-03-25 20:10:48'),
            array('id' => '34','title' => 'Chantale Harrison','slug' => 'Rising Star','type' => 'investor','status' => '1','featured' => '1','lang' => 'en','created_at' => '2024-03-25 20:28:35','updated_at' => '2024-03-25 20:28:35'),
            array('id' => '35','title' => 'Breanna Castro','slug' => 'New Investor','type' => 'investor','status' => '1','featured' => '1','lang' => 'en','created_at' => '2024-03-25 20:29:37','updated_at' => '2024-03-25 20:29:37')
          );


        Post::insert($posts);
    }
}
