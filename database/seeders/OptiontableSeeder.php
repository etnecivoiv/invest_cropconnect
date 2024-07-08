<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Option;

class OptiontableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $options = array(
  array('id' => '1','key' => 'primary_data','value' => '{"contact_email":"contact@email.com","contact_phone":"8801234567890","address":"Bowery St, New York","socials":{"facebook":"https:\\/\\/www.facebook.com\\/","youtube":"https:\\/\\/youtube.com\\/","twitter":"https:\\/\\/twitter.com\\/","instagram":"https:\\/\\/www.instagram.com\\/","linkedin":"https:\\/\\/linkedin.com\\/"},"footer_logo":"\\/uploads\\/23\\/04\\/16809882645YTjTdvCTduL5D1hCfX7.png","about_section":{"features":[{"text":"Profit Return","percent":"50","color":"#32bead"},{"text":"Profit Loss","color":"#ff7e84","percent":"30"},{"text":"Live Update Data","color":"#fbde4b","percent":"100"}],"top_title":"About GrowVest","title":"We Provide The Best Agro Investment  {Return}","text":"We are working to facilitate access to finance, input and marketplace for smallholder farmers across 23 zones in our country.","image":"\\/uploads\\/24\\/03\\/eT0gB6J9vTfieImUqCrZ.png"},"why_choose":{"features":[{"title":null,"text":"Earn from your multiple projects","icon":"\\/uploads\\/24\\/03\\/DawrYYtTYVgWpkvxhQlI.svg"},{"title":null,"text":"We provide farmers with the latest market data","icon":"\\/uploads\\/24\\/03\\/mzdZKkZVZ6GCDAcywgqq.svg"}],"top_title":"Why Choose GrowVest","title":"Invest Today, Earn {Lifetime}","text":"Explore the wide range of agricultural projects ranging across crops, livestock, poultry and fisheries.","image":"\\/uploads\\/24\\/03\\/HoKipTjHxHmPGY0PFW0l.png"},"achievement":{"counters":[{"counter":"10M+","text":"Projects Financed","icon":"\\/uploads\\/24\\/03\\/Tl7cPV74f7BySmjfl29A.png"},{"counter":"6m+","text":"Agricultural Yield","icon":"\\/uploads\\/24\\/03\\/Cb6jLKgiBML43dis2bEu.png"},{"counter":"10000+","text":"Farmers Engaged","icon":"\\/uploads\\/24\\/03\\/9h1rmemozrclGk72Gygr.png"},{"counter":"248M","text":"Return Reimbursed","icon":"\\/uploads\\/24\\/03\\/g9mKAProqHsV6D4rQ3SD.png"}],"top_title":"Some Fun Fact","title":"Our Great {Achievement}","video_url":"https:\\/\\/www.youtube.com\\/watch?v=5ZiHkYhWEto","video_bg_img":"\\/uploads\\/24\\/03\\/x9GjJuzxZh7QkHQ3mpC0.png"},"copyright_text":"\\u00a9 Copyright 2024 | GrowVest | All Rights Reserved","favicon":"\\/uploads\\/24\\/05\\/1q4xyHo5WEnKoiJInSHp.png","logo":"\\/uploads\\/24\\/05\\/J2odtOMJq6ETTF105KOS.png","deep_logo":"\\/uploads\\/24\\/05\\/cpjWPywybYfFi61GV3dT.png"}','lang' => 'en'),
  array('id' => '2','key' => 'tax','value' => '{"tax":10}','lang' => 'en'),
  array('id' => '3','key' => 'base_currency','value' => '{"name":"USD","icon":"$","position":"right"}','lang' => 'en'),
  array('id' => '4','key' => 'invoice_data','value' => '{"company_name":"Growvest","address":"San francisco","city":"California","post_code":"12345","country":"USA"}','lang' => 'en'),
  array('id' => '5','key' => 'languages','value' => '"{\\"en\\":\\"English\\"}"','lang' => 'en'),
  array('id' => '6','key' => 'seo_home','value' => '{"site_name":"Home","matatag":"","matadescription":"","twitter_site_title":"home","preview":""}','lang' => 'en'),
  array('id' => '7','key' => 'seo_blog','value' => '{"site_name":"Blogs","matatag":"","matadescription":"","preview":""}','lang' => 'en'),
  array('id' => '8','key' => 'seo_about','value' => '{"site_name":"About Us","matatag":"","matadescription":"","preview":""}','lang' => 'en'),
  array('id' => '10','key' => 'seo_contact','value' => '{"site_name":"Contact Us","matatag":"","matadescription":"","preview":""}','lang' => 'en'),
  array('id' => '12','key' => 'seo_investor','value' => '{"site_name":"Investors","matatag":"","matadescription":"","preview":""}','lang' => 'en'),
  array('id' => '13','key' => 'seo_project','value' => '{"site_name":"Projects","matatag":"","matadescription":"","preview":""}','lang' => 'en'),
  array('id' => '14','key' => 'seo_event','value' => '{"site_name":"Events","matatag":"","matadescription":"","preview":""}','lang' => 'en'),
  array('id' => '15','key' => 'header_footer','value' => '{"header":{"announcement_type":"NOW HIRING:","announcement_title":"Are You A Driven And Motivated 1st Line IT Support Engineer?","announcement_link":"\\/contact","top_text":"12893 Green Valley Street, USA 83682","top_text2":"info@cropconnect.ph"},"footer":{"title":"Ready To Launch \\ud83d\\ude80","description":"Lorem ipsum amet, consectetur adipiscing elit. Suspendis varius enim eros elementum tristique. Duis cursus.","right_image_link":"\\/pricing","left_image_link":"\\/pricing"}}','lang' => 'en'),
  array('id' => '16','key' => 'home_page','value' => '{"hero":{"title":"Better {Earning Future} Starts With GrowVest","subtitle":"We seek to improve the lives of 10 Million farmers in our country.","btn_text":"Get Started Now","btn_text2":"Start Investing","btn_link":"\\/register","btn_link2":"\\/projects","image":"\\/uploads\\/24\\/03\\/3FPq4a40JSb3ZF7hr20H.png"}}','lang' => 'en'),
  array('id' => '17','key' => 'why-choose','value' => '{"title":"Why choose WASender \\ud83c\\udf96\\ufe0f","subtitle":"Get start","left_button_link":"\\/pricing","right_button_link":"\\/pricing","left_block_title":"Active Customers","left_block_value":"1200","center_block_title":"Total Customers","center_block_value":"1500","right_block_title":"Positive Reviews","right_block_value":"600","left_button_image":"\\/uploads\\/23\\/03\\/1678120554l1bhGUjz28tmiBtCqTK6.png","right_button_image":"\\/uploads\\/23\\/03\\/1678120554IAVDm9xBLZXYtGAamM0I.png","left_block_image":"\\/uploads\\/23\\/03\\/1678120554hneDbhf9WG6aXvdV0h6q.png","center_block_image":"\\/uploads\\/23\\/03\\/1678120554PcP79pqqlziQ71Yf1T70.png","right_block_image":"\\/uploads\\/23\\/03\\/1678120554dGH99dtfF4slpDVVHjT1.png"}','lang' => 'en'),
  array('id' => '18','key' => 'contact_page','value' => '{"address":"1012 Pebda Parkway, Mirpur 2 Dhaka,","country":"Bangladesh","map_link":"https:\\/\\/maps.google.com\\/maps?width=600&height=400&hl=en&q=dhaka%20collage&t=&z=12&ie=UTF8&iwloc=B&output=embed","contact1":"8801234567890","contact2":"8801234567891","email1":"support@email.com","email2":"contact@email.com","contact_info_text":"Open a chat or give us call at","contact_info_number":"310.841.5500","live_chat_service_text":"live chat service","live_chat_service_website":"www.jobilivechat.com"}','lang' => 'en'),
  array('id' => '19','key' => 'about_page','value' => '{"testimonial":{"top_title":"Testimonial","title":"What Says Our Investors About Us","text":"There are many variations of passages of Lorem Ipsum available, but the majority have suffered. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.","btn_link":"\\/","btn_text":"View All Reviews","image":"\\/uploads\\/24\\/03\\/w3VkxPs4SSNRoI2Cogba.png"},"faq":{"top_title":"Frequently Asked Question","title":"General {Questions}","image":"\\/uploads\\/24\\/03\\/ZuwVUgss4TS5PwpqBvDz.png"}}','lang' => 'en'),
  array('id' => '20','key' => 'counter','value' => '{"experience":"12","active_customers":"900","positive_reviews":"200","satisfied_customers":"800"}','lang' => 'en'),
  array('id' => '21','key' => 'theme_path','value' => '{"home":"One","job_list":{"path":"One","type":"List"},"job_detail":"One","candidate_list":"One","candidate_detail":"One","company_list":"One","blog":"One"}','lang' => 'en'),
  array('id' => '29','key' => 'seo_login','value' => '{"site_name":"Sing In","matatag":"","matadescription":"","preview":""}','lang' => 'en'),
  array('id' => '30','key' => 'seo_register','value' => '{"site_name":"Sing Up","matatag":"","matadescription":"","preview":""}','lang' => 'en'),
  array('id' => '35','key' => 'affiliate_commission_percent','value' => '2','lang' => 'en')
);

          
        Option::insert($options);
    }
}
