<?php

namespace App\Http\Controllers\Admin;

use App\Models\Post;
use Inertia\Inertia;
use App\Traits\Uploader;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class FeaturesController extends Controller
{
    use Uploader;

    public function __construct()
    {
        $this->middleware('permission:features');
    }

    public function index()
    {

        $posts = Post::where('type', 'feature')->with('excerpt', 'preview')->latest()->paginate(20);
        $segments = request()->segments();
        $buttons = [
            [
                'name' => '<i class="fa fa-plus"></i>&nbsp' . __(' Create feature'),
                'url' => route('admin.features.create')
            ]
        ];

        return Inertia::render('Admin/Feature/Index', compact('posts', 'segments', 'buttons'));
    }

    public function create()
    {
        $languages = get_option('languages', true);

        $segments = request()->segments();
        $buttons = [
            [
                'name' => __('Back'),
                'url' => route('admin.features.index')
            ]
        ];

        return Inertia::render('Admin/Feature/Create', compact('languages', 'segments', 'buttons'));
    }


    public function store(Request $request)
    {

        $request->validate([
            'title' => 'required|max:150',
            'description' => 'required|max:500',
            'main_description' => 'required|max:5000',
            'preview_image' => 'required|image|max:1024',
            'banner_image' => 'required|image|max:2048',
        ]);


        DB::beginTransaction();
        try {

            $post = new Post;
            $post->title = $request->title;
            $post->slug = Str::slug($request->title);
            $post->type = 'feature';
            $post->lang = $request->language ?? 'en';
            $post->status = $request->status ? 1 : 0;
            $post->featured = $request->featured ? 1 : 0;
            $post->save();

            $post->excerpt()->create([
                'post_id' => $post->id,
                'key' => 'excerpt',
                'value' => $request->description,
            ]);

            $post->longDescription()->create([
                'post_id' => $post->id,
                'key' => 'main_description',
                'value' => $request->main_description,
            ]);

            $preview = $this->saveFile($request, 'preview_image');

            $post->preview()->create([
                'post_id' => $post->id,
                'key' => 'preview',
                'value' => $preview,
            ]);

            $banner = $this->saveFile($request, 'banner_image');

            $post->banner()->create([
                'post_id' => $post->id,
                'key' => 'banner',
                'value' => $banner,
            ]);

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollback();

            return response()->json([
                'message' => $th->getMessage()
            ], 500);
        }

        return to_route('admin.features.index');
    }

    public function edit($id)
    {
        $info = Post::where('type', 'feature')->with('excerpt', 'preview', 'longDescription', 'banner')->findOrFail($id);

        $languages = get_option('languages', true);

        $segments = request()->segments();
        $buttons = [
            [
                'name' => __('Back'),
                'url' => route('admin.features.index')
            ]
        ];

        return Inertia::render('Admin/Feature/Edit', compact('languages', 'segments', 'buttons', 'info'));
    }

    public function update(Request $request, $id)
    {
        $request->all();

        $request->validate([
            'title' => 'required|max:150',
            'description' => 'required|max:500',
            'main_description' => 'required|max:5000',
            'preview_image' => 'nullable|image|max:1024',
            'banner_image' => 'nullable|image|max:2048',
        ]);

        DB::beginTransaction();
        try {

            $post = Post::with('preview')->findOrFail($id);
            $post->title = $request->title;
            $post->slug = Str::slug($request->title);
            $post->type = 'feature';
            $post->lang = $request->language ?? 'en';
            $post->status = $request->status ? 1 : 0;
            $post->featured = $request->featured ? 1 : 0;
            $post->save();

            $post->excerpt()->update([
                'post_id' => $post->id,
                'key' => 'excerpt',
                'value' => $request->description,
            ]);


            $post->longDescription()->update([
                'post_id' => $post->id,
                'key' => 'main_description',
                'value' => $request->main_description,
            ]);

            if ($request->hasFile('preview_image')) {
                $preview = $this->saveFile($request, 'preview_image');

                !empty ($post->preview) ? $this->removeFile($post->preview->value) : '';

                $post->preview()->update([
                    'post_id' => $post->id,
                    'key' => 'preview',
                    'value' => $preview,
                ]);
            }

            if ($request->hasFile('banner_image')) {
                $banner = $this->saveFile($request, 'banner_image');

                !empty ($post->banner) ? $this->removeFile($post->banner->value) : '';

                $banner = $post->banner()->update([
                    'post_id' => $post->id,
                    'key' => 'banner',
                    'value' => $banner,
                ]);
            }

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollback();

            return response()->json([
                'message' => $th->getMessage()
            ], 500);
        }

        return to_route('admin.features.index');
    }

    public function destroy($id)
    {
        $post = Post::where('type', 'feature')->with('preview', 'banner')->findOrFail($id);

        if (!empty ($post->preview)) {
            $this->removeFile($post->preview->value);
        }

        if (!empty ($post->banner)) {
            $this->removeFile($post->banner->value);
        }

        $post->delete();

        return back();
    }
}
