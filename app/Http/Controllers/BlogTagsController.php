<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\SeoMeta;

class BlogTagsController extends Controller
{
    public function __invoke(string $slug)
    {

        $category = Category::firstWhere([
            'slug' => $slug
        ]);

        $blogs = $category->blogPosts()->with('preview:id,post_id,value','categories:id,title')->active()
            ->when(request('s'), fn ($q) => $q->where('title', 'LIKE', '%' . request('s') . '%'))
            ->paginate()->through(function ($post) {
                $post->category_name = $post->categories()->first()?->title;
                $post->image = asset($post->preview->value);
                return $post;
            });

        $categories = Category::blogs()->withCount('blogPosts as blogs_count')->active()->limit(20)->get();
        $tags = Category::tags()->active()->limit(20)->get();

        $recent_blogs = Post::blogs()->active()
            ->with('shortDescription', 'preview')
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($post) {
                $post->image = asset($post->preview->value);
                return $post;
            });


        return Inertia::render('Web/Blogs/Index', [
            'blogs' => $blogs,
            'recent_blogs' => $recent_blogs,
            'categories' => $categories,
            'category' => $category,
            'tags' => $tags,
            'seo' => SeoMeta::init('seo_blog'),
        ]);
    }
}
