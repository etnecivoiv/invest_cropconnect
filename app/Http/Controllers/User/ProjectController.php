<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $segments = request()->segments();
        $buttons = [];

        $projects = Project::query();
        if ($request->has('category')) {
            $projects = $projects->whereHas('category', fn ($q) => $q->where('slug', 'LIKE', '%' . $request->category . '%'));
        }
        $projects = $projects->with(['category'])->where('status',1)->latest()->paginate()->through(function ($project) {
            $durations = $project->durations()->get();
            $maxProfitReturn = $durations->max('max_profit_return');
            $minProfitReturn = $durations->min('min_profit_return');
            $lossMinRange = $durations->min('loss_min_range');
            $lossMaxRange = $durations->max('loss_max_range');

            $durationRanges = $durations->map(function ($duration) {
                return [
                    'duration' => $duration->duration . '/ ' . $duration->duration_type,
                ];
            });
            return [
                'cover_image' => $project->cover_image,
                'title' => $project->title,
                'slug' => $project->slug,
                'address' => $project->address,
                'invest_amount' => $project->invest_amount,
                'total_units' => $project->total_units,
                'category' => $project->category,
                'max_profit_return' => $maxProfitReturn,
                'min_profit_return' => $minProfitReturn,
                'loss_min_range' => $lossMinRange,
                'loss_max_range' => $lossMaxRange,
                'duration_ranges' => $durationRanges,
            ];
        });
        $categories = Category::whereType('project')
            ->with('meta:category_id,value')
            ->latest()
            ->get();
        return Inertia::render('User/Projects/Index', [
            'projects' => $projects,
            'segments' => $segments,
            'buttons' => $buttons,
            'categories' => $categories,
            'request' => $request,
        ]);
    }
}
