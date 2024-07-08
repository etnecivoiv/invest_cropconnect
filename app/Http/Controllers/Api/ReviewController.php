<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function reviews()
    {
        $project = Project::where('id', request()->id)
            ->where('status', 1)
            ->firstOrFail();
        $reviews = Review::query()->where('project_id', $project->id)
            ->where('status', 1)
            ->with(['user:id,name,username,created_at,avatar'])
            ->paginate(5);
        return response()->json($reviews);
    }
}
