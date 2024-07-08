<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post;
use App\Services\SeoMeta;
use Inertia\Inertia;

class BlogPostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $blogs = Post::blogs()
            ->with(['preview:id,post_id,value'])
            ->active()
            ->when(request('s'), fn ($q) => $q->where('title', 'LIKE', '%' . request('s') . '%'))
            ->paginate(8)
            ->through(function ($post) {
                $post->image = asset($post->preview->value);
                $post->category_name = $post->categories()->first()?->title;
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
            'tags' => $tags,
            'request' => request()->all(),
            'seo' => SeoMeta::init('seo_blog'),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $blog)
    {
        $blog->image = $blog->preview?->value;
        $blog->content = $blog->longDescription?->value;
        $blog->tags = $blog->tags()->limit(3)->get();


        $categories = Category::blogs()->withCount('blogPosts as blogs_count')->active()->limit(20)->get();
        $tags = Category::tags()->active()->limit(20)->get();
        $recent_blogs = Post::blogs()->active()
            ->with('shortDescription', 'preview')
            ->whereNot('id', $blog->id)
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($post) {
                $post->image = $post->preview->value;
                return $post;
            });

        $prevPost = Post::where('id', '<', $blog->id)->blogs()->limit(1)->first();
        if ($prevPost) {
            $prevPost->image = $prevPost->preview?->value;
        }
        $nextPost = Post::where('id', '>', $blog->id)->blogs()->limit(1)->first();
        if ($nextPost) {
            $nextPost->image = $nextPost->preview?->value;
        }

        $seo = (array) json_decode($blog->seo?->value ?? '');

        SeoMeta::set($seo);

        return Inertia::render('Web/Blogs/Show', [
            'blog' => $blog,
            'recent_blogs' => $recent_blogs,
            'categories' => $categories,
            'tags' => $tags,
            'request' => request()->all(),
            'prevPost' => $prevPost,
            'nextPost' => $nextPost,

        ]);
    }
}
