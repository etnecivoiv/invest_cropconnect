<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Project;
use App\Models\Category;
use App\Models\Invest;
use App\Models\Review;
use App\Services\SeoMeta;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
       
        SeoMeta::init('seo_project');

        $projects = Project::active()
            ->with('category')
            ->withAvg('reviews', 'star')
            ->when(request('s'), fn ($q) => $q->where('title', 'LIKE', '%' . request('s') . '%'))
            ->when(request('ratings'), fn ($q) => $q->having('reviews_avg_star', request('ratings')))
            ->when(request('min_invest') || request('max_invest'), function ($q) {
                return $q->whereBetween('invest_amount', [request('min_invest'), request('max_invest')]);
            });
       
            $projects =  $request->orderBy == 'Oldest' ? $projects->oldest()->paginate() : $projects->latest()->paginate();
     

        $categories = Category::where('type', 'project')->withCount('projects')->active()->get();

        $min_invest = Project::min('invest_amount');
        $max_invest = Project::max('invest_amount') + 100;

        return Inertia::render('Web/Projects/Index', [
            'projects' => $projects,
            'categories' => $categories,
            'singleProject' => null,
            'min_invest' => $min_invest,
            'max_invest' => $max_invest,
            'request' => request()->all(),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($slug)
    {
        $project = Project::active()->where('slug', $slug)
            ->with(['metas', 'category', 'durations'])
            ->withCount(['reviews' => fn ($q) => $q->where('status', 1)])
            ->withAvg('reviews', 'star')
            ->firstOrFail();

        // Project::STATUS['ACTIVE'];
        $maxProfitReturn = $project->durations()->orderByDesc('max_profit_return')->first();
        $minProfitReturn = $project->durations()->orderBy('min_profit_return')->first();
        $investedUnits = $project->invests()->sum('qty');

        // reviews
        $canReview = false;
        $alreadyInvested = Invest::query()->where('project_id', $project->id)
            ->where('user_id', auth()->id())->exists();
        $review = $project->reviews()
            ->where('user_id', auth()->id())
            ->where('status', 1);
        if (!$review->exists() && $alreadyInvested) {
            $canReview = true;
        }
        // project's reviews and group by star
        $reviewsByStar = $project->reviews()
            ->where('status', 1)
            ->selectRaw('star, count(*) as count')
            ->groupBy('star')
            ->get();

        $percentageByStar = [];

        $totalReviews = $reviewsByStar->sum('count');
        $possibleStars = [1, 2, 3, 4, 5];
        foreach ($possibleStars as $star) {
            $starCount = $reviewsByStar->firstWhere('star', $star);
            $count = 0;
            if ($starCount) $count = $starCount->count;

            $percentage = $totalReviews > 0 ? ($count / $totalReviews) * 100 : 0;
            $percentageByStar[$star] = round($percentage);
        }

        $relatedProjects = Project::withAvg('reviews', 'star')
            ->where('category_id', $project->id)
            ->where('id', '!=', $project->id)
            ->active()
            ->limit(5)
            ->get();

        SeoMeta::set([
            'title' => $project->metas()->where('key', 'seo_title')->value('value'),
            'description' => $project->metas()->where('key', 'seo_description')->value('value'),
            'preview' => $project->metas()->where('key', 'seo_image')->value('value'),
            'tags' => $project->metas()->where('key', 'seo_tags')->value('value'),
        ]);

        return Inertia::render('Web/Projects/Show', [
            'project' => $project,
            'profitReturn' => [
                'min' =>  ['is_fixed' => $minProfitReturn->return_type == 'fixed', 'value' => $minProfitReturn->min_profit_return],
                'max' =>  ['is_fixed' => $maxProfitReturn->return_type == 'fixed', 'value' => $maxProfitReturn->max_profit_return]
            ],
            'availableUnits' => $project->total_units - $investedUnits,
            'canReview' => $canReview,
            'percentageByStar' => $percentageByStar,
            'relatedProjects' => $relatedProjects,

        ]);
    }
}
