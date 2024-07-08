<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\CategoryMeta;


class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        /* `agro`.`categories` */
        $categories = array(
            array('id' => '7','parent_id' => NULL,'type' => 'blog_category','title' => 'Envato','slug' => 'envato','preview' => NULL,'status' => '1','is_featured' => '1','lang' => 'en','created_at' => '2023-03-06 18:35:30','updated_at' => '2023-03-06 18:35:30'),
            array('id' => '8','parent_id' => NULL,'type' => 'blog_category','title' => 'Codecanyon','slug' => 'codecanyon','preview' => NULL,'status' => '1','is_featured' => '1','lang' => 'en','created_at' => '2023-03-06 18:36:44','updated_at' => '2023-10-12 08:23:38'),
            array('id' => '9','parent_id' => NULL,'type' => 'blog_category','title' => 'Themeforest','slug' => 'themeforest','preview' => NULL,'status' => '1','is_featured' => '1','lang' => 'en','created_at' => '2023-03-06 18:36:50','updated_at' => '2023-03-06 18:36:50'),
            array('id' => '10','parent_id' => NULL,'type' => 'blog_category','title' => 'php','slug' => 'php','preview' => NULL,'status' => '1','is_featured' => '1','lang' => 'en','created_at' => '2023-03-06 18:37:56','updated_at' => '2023-03-06 18:37:56'),
            array('id' => '11','parent_id' => NULL,'type' => 'tags','title' => 'support','slug' => 'support','preview' => NULL,'status' => '1','is_featured' => '1','lang' => 'en','created_at' => '2023-03-06 18:38:24','updated_at' => '2023-03-06 18:38:24'),
            array('id' => '12','parent_id' => NULL,'type' => 'tags','title' => 'laravel','slug' => 'laravel','preview' => NULL,'status' => '1','is_featured' => '1','lang' => 'en','created_at' => '2023-03-06 18:38:46','updated_at' => '2023-03-06 18:38:46'),
            array('id' => '13','parent_id' => NULL,'type' => 'tags','title' => 'chatgpt','slug' => 'chatgpt','preview' => NULL,'status' => '1','is_featured' => '1','lang' => 'en','created_at' => '2023-03-06 18:39:05','updated_at' => '2023-03-06 18:39:05'),
            array('id' => '14','parent_id' => NULL,'type' => 'tags','title' => 'invest','slug' => 'invest','preview' => NULL,'status' => '1','is_featured' => '1','lang' => 'en','created_at' => '2023-03-06 18:39:16','updated_at' => '2023-03-06 18:39:16'),
            array('id' => '15','parent_id' => NULL,'type' => 'blog_category','title' => 'Saas','slug' => 'saas','preview' => NULL,'status' => '1','is_featured' => '1','lang' => 'en','created_at' => '2023-03-06 18:35:06','updated_at' => '2023-03-06 18:35:06'),
            array('id' => '23','parent_id' => NULL,'type' => 'project','title' => 'Variable Return','slug' => 'variable-return','preview' => '/uploads/demo/24/03/IxaqRZqw0qgi0uXRBNj2.png','status' => '1','is_featured' => '0','lang' => 'en','created_at' => '2024-03-16 07:42:44','updated_at' => '2024-03-16 07:42:44'),
            array('id' => '24','parent_id' => NULL,'type' => 'project','title' => 'Long Term','slug' => 'long-term','preview' => '/uploads/demo/24/03/sTgwFGjnfAmq1c9iBxim.png','status' => '1','is_featured' => '0','lang' => 'en','created_at' => '2024-03-16 07:47:29','updated_at' => '2024-03-16 07:47:29'),
            array('id' => '25','parent_id' => NULL,'type' => 'project','title' => 'Fixed Return','slug' => 'fixed-return','preview' => '/uploads/demo/24/03/bHNceLD1RftvYDwLwtL2.png','status' => '1','is_featured' => '0','lang' => 'en','created_at' => '2024-03-16 07:54:44','updated_at' => '2024-03-16 07:54:44'),
            array('id' => '26','parent_id' => NULL,'type' => 'project','title' => 'Short Return','slug' => 'short-return','preview' => '/uploads/demo/24/03/sP9YBHOg4C9fXdub5kmC.png','status' => '1','is_featured' => '0','lang' => 'en','created_at' => '2024-03-16 07:57:48','updated_at' => '2024-03-16 07:57:48'),
            array('id' => '27','parent_id' => NULL,'type' => 'project','title' => 'Supply Chain','slug' => 'supply-chain-returns','preview' => '/uploads/demo/24/03/tpkLscqjsLt35Bev7c06.png','status' => '1','is_featured' => '0','lang' => 'en','created_at' => '2024-03-16 08:03:53','updated_at' => '2024-03-16 08:04:11'),
            array('id' => '28','parent_id' => NULL,'type' => 'project','title' => 'Crop Yield','slug' => 'crop-yield-returns','preview' => '/uploads/demo/24/03/7Jdr7rDwi5jBr01y60JQ.png','status' => '1','is_featured' => '0','lang' => 'en','created_at' => '2024-03-16 08:08:04','updated_at' => '2024-03-16 08:08:16'),
            array('id' => '30','parent_id' => NULL,'type' => 'brand','title' => '#','slug' => '/uploads/demo/24/03/QF6tCutN6LL2bcDNAUwO.png','preview' => NULL,'status' => '1','is_featured' => '0','lang' => 'en','created_at' => '2024-03-16 09:24:30','updated_at' => '2024-03-16 09:24:30'),
            array('id' => '31','parent_id' => NULL,'type' => 'brand','title' => '#','slug' => '/uploads/demo/24/03/BmzhusCUY4vA42Dhv5M3.png','preview' => NULL,'status' => '1','is_featured' => '0','lang' => 'en','created_at' => '2024-03-16 09:25:08','updated_at' => '2024-03-16 09:25:08'),
            array('id' => '32','parent_id' => NULL,'type' => 'brand','title' => '#','slug' => '/uploads/demo/24/03/AL9hhzoJJk48xXZj8Sn3.png','preview' => NULL,'status' => '1','is_featured' => '0','lang' => 'en','created_at' => '2024-03-16 09:25:20','updated_at' => '2024-03-16 09:25:20'),
            array('id' => '33','parent_id' => NULL,'type' => 'brand','title' => '#','slug' => '/uploads/demo/24/03/oPD0y1GjYnMuaLfFGPa5.png','preview' => NULL,'status' => '1','is_featured' => '0','lang' => 'en','created_at' => '2024-03-16 09:25:43','updated_at' => '2024-03-16 09:25:43'),
            array('id' => '34','parent_id' => NULL,'type' => 'brand','title' => '#','slug' => '/uploads/demo/24/03/9UfuDuwr4LS4pWJUHABR.png','preview' => NULL,'status' => '1','is_featured' => '0','lang' => 'en','created_at' => '2024-03-16 09:26:14','updated_at' => '2024-03-16 09:26:14')
        );


        Category::insert($categories);


        $category_metas = array(
            array('id' => '2','category_id' => '23','key' => 'description','value' => 'Variable Return Investments offer fluctuating yields based on market performance, providing potential for higher returns but also increased risk.'),
            array('id' => '3','category_id' => '24','key' => 'description','value' => 'Long Time Return Investments: Steady growth over extended periods, offering stability and potential for substantial returns with patience.'),
            array('id' => '4','category_id' => '25','key' => 'description','value' => 'Fixed Return Investments: Consistent and predictable returns at a set rate, offering stability and security for investors.'),
            array('id' => '5','category_id' => '26','key' => 'description','value' => 'Short-term investment returns refer to the profits earned on investments held for a brief period, typically ranging from a few days to a few months. These returns offer relatively quick gains but often involve higher risks compared to long-term investments. Investors may opt for short-term strategies to capitalize on market fluctuations or to meet immediate financial goals.'),
            array('id' => '6','category_id' => '27','key' => 'description','value' => 'These returns are generated from investments in agricultural supply chain infrastructure, including storage facilities, transportation networks, and processing plants. Investors can earn returns through fees, leasing arrangements, and value-added services within the supply chain.'),
            array('id' => '7','category_id' => '28','key' => 'description','value' => 'These returns are derived from investing in agricultural production, where investors receive income based on the yield of crops grown. Returns can vary depending on factors such as weather conditions, pest control, and crop management practices.')
          );

        CategoryMeta::insert($category_metas); 
    }
}
