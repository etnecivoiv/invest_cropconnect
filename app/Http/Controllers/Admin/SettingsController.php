<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Services\Toastr;
use App\Traits\Uploader;
use App\Services\PageHeader;
use App\Actions\OptionUpdate;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cache;

class SettingsController extends Controller
{
    use Uploader;


    public function __construct()
    {
        $this->middleware('permission:page-settings');
    }

    public function index()
    {
        Cache::flush();

        PageHeader::set()->title(__('Page Settings'));

        $primary_data = count(get_option('primary_data', locale: true)) ? get_option('primary_data', locale: true) : get_option('primary_data');
        $home_page = count(get_option('home_page', locale: true)) ? get_option('home_page', locale: true) : get_option('home_page');
        $about_page = count(get_option('about_page', locale: true)) ? get_option('about_page', locale: true) : get_option('about_page');


        return Inertia::render('Admin/PageSetting/Index', [
            'primary_data' => $primary_data,
            'home_page' => $home_page,
            'about_page' => $about_page,
        ]);
    }

    public function update($id)
    {
        $optionUpdate = new OptionUpdate();
        $optionUpdate->update($id);

        Cache::flush();
        Toastr::success(__('Updated Successfully'));
        return back();
    }
}
