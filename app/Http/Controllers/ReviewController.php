<?php

namespace App\Http\Controllers;

use App\Models\Invest;
use App\Models\Project;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ReviewController extends Controller
{

    public function store(Request $request)
    {
        $request->validate([
            'comment' => 'required|string|max:255',
            'star' => 'required|integer|between:1,5',
        ]);
        $project = Project::findOrFail($request->project_id);
        $invest = Invest::query()->where('project_id', $project->id)
            ->where('user_id', auth()->id());
        if (!$invest->exists()) {
            return throw ValidationException::withMessages(['order' => 'You can not review this prompt']);
        }

        Review::create([
            'comment' => $request->comment,
            'star' => $request->star,
            'project_id' => $project->id,
            'user_id' => auth()->id(),
            'status' => 0,
            'project_id' => $project->id,
        ]);

        return back();
    }
}
