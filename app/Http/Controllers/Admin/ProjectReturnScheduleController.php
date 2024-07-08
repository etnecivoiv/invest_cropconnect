<?php

namespace App\Http\Controllers\Admin;

use App\Models\Project;
use Illuminate\Http\Request;
use App\Models\ReturnSchedule;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreReturnScheduleRequest;
use App\Http\Requests\UpdateReturnScheduleRequest;
use App\Traits\Uploader;
use Carbon\Carbon;

class ProjectReturnScheduleController extends Controller
{
    use Uploader;
    /**
     * Display a listing of the resource.
     */
    public function index(Project $project)
    {
        $segments = request()->segments();
        $buttons = [
            [
                'name' => '<i class="fa fa-plus"></i>&nbsp' . __('Add New'),
                'url' => route('admin.return-schedules.create', $project),
            ]
        ];

        $returnSchedules = $project->returnSchedules()
            ->with('project_duration:id,duration,duration_type')->paginate();

        $total = $project->returnSchedules()->count();
        $totalActive = $project->returnSchedules()->where('status', 1)->count();
        $totalInactive = $project->returnSchedules()->where('status', 0)->count();
        return inertia('Admin/Projects/ReturnSchedules/Index', [
            'segments' => $segments,
            'buttons' => $buttons,
            'project' => $project,
            'returnSchedules' => $returnSchedules,
            'total' => $total,
            'totalActive' => $totalActive,
            'totalInactive' => $totalInactive,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Project $project)
    {
        $viewData['segments'] = request()->segments();
        $viewData['buttons'] = [
            [
                'name' => '<i class="fa fa-list"></i>&nbsp' . __('Back to list'),
                'url' => route('admin.return-schedules.index', $project),
            ]
        ];
        $viewData['project'] = $project;
        $viewData['durations'] = $project->durations;

        return inertia('Admin/Projects/ReturnSchedules/Create', $viewData);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreReturnScheduleRequest $request, Project $project)
    {
        $data = $request->except('attachment');

        if ($request->hasFile('attachment')) {
            $data['attachment'] = $this->saveFile($request, 'attachment');
        }

        $project->returnSchedules()->create($data);

        return to_route('admin.return-schedules.index', $project);
    }

  

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project, ReturnSchedule $returnSchedule)
    {
        $viewData['segments'] = request()->segments();
        $viewData['buttons'] = [
            [
                'name' => '<i class="fa fa-list"></i>&nbsp' . __('Back to list'),
                'url' => route('admin.return-schedules.index', $project),
            ]
        ];
        $viewData['project'] = $project;
        $viewData['durations'] = $project->durations;
        $returnSchedule->return_date = Carbon::make($returnSchedule->return_date)->format('Y-m-d');
        $viewData['return_schedule'] = $returnSchedule;

        return inertia('Admin/Projects/ReturnSchedules/Edit', $viewData);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateReturnScheduleRequest $request, Project $project, ReturnSchedule $returnSchedule)
    {
        $data = $request->except('attachment');

        if ($request->hasFile('attachment')) {
            $data['attachment'] = $this->saveFile($request, 'attachment');
        }

        $returnSchedule->update($data);

        return to_route('admin.return-schedules.index', $project);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project, ReturnSchedule  $returnSchedule)
    {
        $returnSchedule->delete();
        return back();
    }
}
