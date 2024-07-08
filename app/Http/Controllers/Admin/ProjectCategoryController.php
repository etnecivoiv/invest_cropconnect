<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProjectCategoryRequest;
use App\Http\Requests\UpdateProjectCategoryRequest;
use App\Traits\Uploader;
use Illuminate\Support\Facades\DB;

class ProjectCategoryController extends Controller
{
    use Uploader;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $segments = request()->segments();
        $buttons = [
            [
                'name' => '<i class="fa fa-plus"></i>&nbsp' . __('Add New'),
                'url' => '#',
                'target' => '#addNewCategoryDrawer',
            ]
        ];
        $categories = Category::whereType('project')
            ->when(request('search'), function ($query) {
                $query->where('title', 'LIKE', '%' . request('search') . '%');
            })
            ->with('meta:category_id,value')
            ->latest()
            ->paginate();

        $totalCategories = Category::whereType('project')->count();
        $activeCategories = Category::whereType('project')->where('status', 1)->count();
        $inActiveCategories = Category::whereType('project')->where('status', 0)->count();

        return Inertia::render('Admin/ProjectCategories/Index', [
            'categories' => $categories,
            'totalCategories' => $totalCategories,
            'activeCategories' => $activeCategories,
            'inActiveCategories' => $inActiveCategories,
            'buttons' => $buttons,
            'segments' => $segments,
        ]);
    }

   

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectCategoryRequest $request)
    {
        DB::transaction(function () use ($request) {
            /**
             * @var \App\Models\Category
             */
            $category = Category::create([
                'type' => 'project',
                'title' => $request->title,
                'status' => $request->status ? 1 : 0,
                'preview' => $this->saveFile($request, 'preview', true)
            ]);
            $category->addMeta('description', $request->get('description'));
        });

        return back();
    }

   

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectCategoryRequest $request, Category $projectCategory)
    {

        DB::transaction(function () use ($request, &$projectCategory) {
            $projectCategory->update([
                'title' => $request->title,
                'status' => $request->status ? 1 : 0,
                'preview' => $request->hasFile('preview') ? $this->saveFile($request, 'preview', true) : $projectCategory->preview
            ]);

            $projectCategory->updateMeta('description', $request->get('description'));
        });

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $projectCategory)
    {
        $projectCategory->delete();
        return back();
    }
}
