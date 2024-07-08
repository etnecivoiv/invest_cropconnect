<?php

namespace App\Http\Controllers\Admin;

use App\Models\Project;
use App\Models\Category;
use App\Traits\Uploader;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Services\PageHeader;
use Carbon\Carbon;

class ProjectController extends Controller
{
    use Uploader;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        PageHeader::set()
            ->title(__("Projects"))
            ->buttons(
                [
                    [
                        'name' => '<i class="fa fa-plus"></i>&nbsp' . __('Add New'),
                        'url' => route('admin.projects.create'),
                    ]
                ]
            );

        $viewData['request'] = request()->all();
        $viewData['projects'] = Project::with('category:id,title')->latest()
            ->when(request()->has(['type', 'search']), function ($query) {
                $query->where(request('type'), 'LIKE', '%' . request('search') . '%');
            })
            ->paginate();

        $viewData['totalProjects'] = Project::count();
        $viewData['activeProjects'] = Project::whereStatus(1)->count();
        $viewData['inActiveProjects'] = Project::whereStatus(0)->count();

        return inertia('Admin/Projects/Index', $viewData);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $viewData['segments'] = request()->segments();
        $viewData['buttons'] = [
            [
                'name' => '<i class="fa fa-list"></i>&nbsp' . __('Back to list'),
                'url' => route('admin.projects.index'),
            ]
        ];
        $viewData['categories'] = Category::whereType('project')->get(['id', 'title']);
        return inertia('Admin/Projects/Create', $viewData);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {

        $projectData = $request->only([
            'category_id',
            'title',
            'total_units',
            'min_return',
            'invest_amount',
            'expire_date',
            'address',
            'accept_new_investor',
            'status',
            'faqs',
        ]);

        $projectData['preview'] = $this->uploadFile('preview');
        $projectData['cover_image'] = $this->uploadFile('cover_image');

        $metas = [
            'short_description' => $request->short_description,
            'main_description' => $request->main_description,
            'seo_title' => $request->seo_title,
            'seo_image' => $this->uploadFile('seo_image'),
            'seo_description' => $request->seo_description,
            'seo_tags' => $request->seo_tags,
        ];

        DB::transaction(function () use ($request, $projectData, $metas) {
            /**
             * @var \App\Models\Project
             */
            $project = Project::create($projectData);
            $project->addMetas($metas);
            $project->addDurations($request->durations);
        });

        return to_route('admin.projects.index');
    }

    

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        $viewData['segments'] = request()->segments();
        $viewData['buttons'] = [
            [
                'name' => '<i class="fa fa-list"></i>&nbsp' . __('Back to list'),
                'url' => route('admin.projects.index'),
            ]
        ];
        $viewData['categories'] = Category::whereType('project')->get(['id', 'title']);
        $project->load('durations', 'metas');
        $project->expire_date = Carbon::make($project->expire_date)->format('Y-m-d');
        $viewData['project'] = $project;
        $viewData['metas'] = $project->metas->flatMap(function ($item) {
            return [$item['key'] => $item['value']];
        });

        return inertia('Admin/Projects/Edit', $viewData);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        $projectData = $request->only([
            'category_id',
            'title',
            'total_units',
            'min_return',
            'invest_amount',
            'expire_date',
            'address',
            'accept_new_investor',
            'status',
            'faqs',
        ]);

        $projectData['preview'] =  $this->uploadFile('preview', $project->preview);
        $projectData['cover_image'] =  $this->uploadFile('cover_image', $project->cover_image);

        $metas = [
            'short_description' => $request->short_description,
            'main_description' => $request->main_description,
            'seo_title' => $request->seo_title,
            'seo_image' => $this->uploadFile('seo_image', $project->getMeta('seo_image')?->value ?? ''),
            'seo_description' => $request->seo_description,
            'seo_tags' => $request->seo_tags,
        ];

        DB::transaction(function () use ($request, $projectData, $metas, $project) {
            $project->update($projectData);
            $project->addMetas($metas);
            $project->addDurations($request->durations);
        });

        return to_route('admin.projects.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $project->delete();
        return back();
    }
}
