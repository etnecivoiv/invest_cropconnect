<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;
use App\Models\Category;
use App\Services\SeoMeta;
use Illuminate\Http\Request;

class InvestorController extends Controller
{
    public function index()
    {
        SeoMeta::init('seo_investor');
        
        $investors =  Post::where('type', 'investor')
            ->latest()
            ->with(['preview'])
            ->limit(4)
            ->get(['id', 'title', 'slug'])
            ->map(function ($item) {
                return [
                    'name' => $item->title,
                    'preview' => $item->preview->value,
                    'socials' => json_decode($item->excerpt->value),
                    'position' => $item->slug
                ];
            });

        $testimonials = Post::where('type', 'testimonial')
            ->with('excerpt', 'preview')
            ->latest()
            ->get()
            ->map(function ($item) {
                return [
                    'name' => $item->title,
                    'position' => $item->slug,
                    'preview' => $item->preview?->value,
                    'comment' => $item->excerpt?->value,
                ];
            });

        $brands = Category::whereType('brand')->latest()->limit(5)->get();

        return Inertia::render('Web/Investors/Index', [
            'investors' => $investors,
            'testimonials' => $testimonials,
            'brands' => $brands
        ]);
    }

    public function show()
    {
        return Inertia::render('Web/Investors/Show');
    }
}
