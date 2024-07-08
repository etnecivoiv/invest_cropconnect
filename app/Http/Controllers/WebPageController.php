<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;
use App\Models\Project;
use App\Models\Category;
use App\Services\SeoMeta;
use Illuminate\Support\Facades\Session;

class WebPageController extends Controller
{
    public function home()
    {
       
        if (!file_exists(base_path('public/uploads/installed'))) {
            return redirect('/install');
        }
        
        $videoUrl = get_option('primary_data')['achievement']['video_url'] ?? null;

        preg_match('%(?:youtube(?:-nocookie)?\.com/(?:[^/]+/.+/|(?:v|e(?:mbed)?)/|.*[?&]v=)|youtu\.be/)([^"&?/ ]{11})%i', $videoUrl, $match);
        $youtube_id = $match[1] ?? '';

        SeoMeta::init('seo_home');

        if (request('ref')) {
            Session::put('uplink_id', request('ref'));
            return redirect('/');
        }

        $home = get_option('home_page', true, true);

        $blogs = Post::query()->with('preview')
            ->where('type', 'blog')
            ->latest()
            ->limit(4)
            ->get()
            ->map(function ($item) {
                $item->image = $item->preview?->value;
                $item->category = str($item->categories?->value('title'))->title();
                return $item;
            });

        $categories = Category::project()
            ->withCount('projects')
            ->latest()
            ->limit(6)
            ->get()
            ->map(function ($item) {
                $item->title = str($item->title)->title()->limit(30);
                return $item;
            });

        $projects = Project::query()->latest()->limit(4)->get();
        $brands = Category::whereType('brand')->latest()->limit(5)->get();


        return inertia('Web/Home', [
            'home' => $home,
            'blogs' => $blogs,
            'categories' => $categories,
            'projects' => $projects,
            'brands' => $brands,
            'youtube_id' => $youtube_id
        ]);
    }

    public function about()
    {
        $faqs = Post::where('type', 'faq')->where('featured', 1)
            ->with(['excerpt'])
            ->latest()
            ->get(['id', 'title'])
            ->map(function ($item) {
                $item->text = $item->excerpt?->value;
                return $item;
            });

        $teamMembers = Post::where('type', 'team')
            ->latest()
            ->with(['preview'])

            ->get(['id', 'title', 'slug'])
            ->map(function ($item) {
                return [
                    'name' => $item->title,
                    'preview' => $item->preview->value,
                    'socials' => json_decode($item->excerpt->value),
                    'position' => $item->slug
                ];
            });

        $about = get_option('about_page', true, true);
        $primary = get_option('primary_data', true, true);

        SeoMeta::init('seo_about');


        return Inertia::render('Web/About', [
            'about' => $about,
            'primary' => $primary,
            'seo' => SeoMeta::init('seo_about'),
            'faqs' => $faqs,
            'teamMembers' => $teamMembers,
        ]);
    }

    public function page($slug)
    {
        $info = Post::with('description', 'seo')->where(['slug' => $slug, 'status' => 1])->firstOrFail();
        $seo = (array) $info->seo?->value ?? [];

        SeoMeta::set($seo);

        $faqs = Post::where('type', 'faq')->where('featured', 1)
            ->with(['excerpt'])
            ->latest()
            ->get(['id', 'title'])
            ->map(function ($item) {
                $item->text = $item->excerpt?->value;
                return $item;
            });
        $about = get_option('about_page', true, true);

        return Inertia::render('Web/CustomPage', compact('info', 'seo', 'faqs', 'about'));
    }
}
