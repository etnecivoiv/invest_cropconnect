<?php

namespace Database\Seeders;

use App\Models\Menu;
use Illuminate\Database\Seeder;

class MenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /* `agro`.`menus` */
        $menus = array(
            array('id' => '1','name' => 'Header','position' => 'main-menu','data' => '[{"id":"f79l42bi","text":"Home","icon":null,"href":"\\/","target":"_self","title":null,"children":[]},{"id":"fdgk6osc","text":"About Us","icon":null,"href":"\\/about-us","target":"_self","title":null,"children":[]},{"id":"3yns2w1x","text":"Projects","icon":null,"href":"\\/projects","target":"_self","title":null,"children":[]},{"id":"keh7dk58","text":"Investors","icon":null,"href":"\\/investors","target":"_self","title":null,"children":[]},{"id":"h63r6slr","text":"Blogs","icon":null,"href":"\\/blogs","target":"_self","title":null,"children":[]},{"id":"3sxc8xip","text":"Events","icon":null,"href":"\\/events","target":"_self","title":null,"children":[]},{"id":"e9sxnmnr","text":"Contact Us","icon":null,"href":"\\/contact-us","target":"_self","title":null,"children":[]}]','lang' => 'en','status' => '1','created_at' => '2023-08-03 16:57:06','updated_at' => '2023-10-19 06:24:39'),
            array('id' => '2','name' => 'Quick Links','position' => 'footer-left','data' => '[{"id":"7u90osuc","text":"About Us","icon":null,"href":"\\/about-us","target":"_self","title":null,"children":[]},{"id":"ctw391xu","text":"Projects","icon":null,"href":"\\/projects","target":"_self","title":null,"children":[]},{"id":"4r8wupe3","text":"Investors","icon":null,"href":"\\/investors","target":"_self","title":null,"children":[]},{"id":"k15ht8xt","text":"My Account","icon":null,"href":"\\/login","target":"_self","title":null,"children":[]}]','lang' => 'en','status' => '1','created_at' => '2023-08-16 17:33:43','updated_at' => '2024-03-26 11:02:07'),
            array('id' => '4','name' => 'Support','position' => 'footer-right','data' => '[{"id":"d49e2gaz","text":"Contact Us","icon":null,"href":"\\/contact-us","target":"_self","title":null,"children":[]},{"id":"ahjc6sxa","text":"Blogs","icon":null,"href":"\\/blogs","target":"_self","title":null,"children":[]},{"id":"h59zzusx","text":"Help center","icon":null,"href":"\\/contact-us","target":"_self","title":null,"children":[]},{"id":"iimp8pdz","text":"Training","icon":null,"href":"\\/events","target":"_self","title":null,"children":[]}]','lang' => 'en','status' => '1','created_at' => '2023-08-16 17:34:10','updated_at' => '2024-03-26 10:56:37')
          );
          
          

        Menu::insert($menus);
    }
}
