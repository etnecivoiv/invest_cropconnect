<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Category;
use App\Services\SeoMeta;
use Illuminate\Http\Request;

class ProjectCategoryController extends Controller
{
    public function __invoke(string $slug)
    {

        $category = Category::firstWhere([
            'slug' => $slug
        ]);



        $projects = $category->projects()
            ->with('category:id,title')
            ->active()
            ->when(request('s'), fn ($q) => $q->where('title', 'LIKE', '%' . request('s') . '%'))
            ->paginate();

        $categories = Category::where('type', 'project')->withCount('projects')->active()->get();

        return Inertia::render('Web/Projects/Index', [
            'projects' => $projects,
            'categories' => $categories,
            'category' => $category,
            'request' => request()->all(),
            'seo' => SeoMeta::init('seo_project'),
        ]);
    }
}
