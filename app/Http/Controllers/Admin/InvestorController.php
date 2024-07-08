<?php

namespace App\Http\Controllers\Admin;

use App\Models\Post;
use Inertia\Inertia;
use App\Traits\Uploader;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Services\Toastr;

class InvestorController extends Controller
{
    use Uploader;

    public function __construct()
    {
        $this->middleware('permission:investors');
    }

    public function index()
    {
        $segments = request()->segments();
        $buttons = [
            [
                'name' => '<i class="fa fa-plus"></i>&nbsp' . __('Create a investors'),
                'url' => route('admin.investors.create'),
            ]
        ];
        $posts = Post::where('type', 'investor')->with('preview')->latest()->paginate(20);
        $totalInvestors = Post::where('type', 'investor')->count();
        $totalActiveInvestors = Post::where('type', 'investor')->where('status', 1)->count();
        $totalInActiveInvestors = Post::where('type', 'investor')->where('status', 0)->count();

        return Inertia::render('Admin/Investors/Index', [
            'posts' => $posts,
            'totalInvestors' => $totalInvestors,
            'totalActiveInvestors' => $totalActiveInvestors,
            'totalInActiveInvestors' => $totalInActiveInvestors,
            'buttons' => $buttons,
            'segments' => $segments,
        ]);
    }

    public function create()
    {
        $segments = request()->segments();
        $buttons = [
            [
                'name' => __('Back'),
                'url' => route('admin.investors.index'),
            ]
        ];
        return Inertia::render('Admin/Investors/Create', [
            'buttons' => $buttons,
            'segments' => $segments,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|max:150',
            'position' => 'required|max:100',
            'profile_picture' => 'required|image|max:2000',
            'description' => 'required|max:1000',
        ]);


        DB::beginTransaction();
        try {

            $post = new Post;
            $post->title = $request->name;
            $post->slug = $request->position;
            $post->status = $request->status ? 1 : 0;
            $post->type = 'investor';
            $post->save();

            $post->excerpt()->create([
                'post_id' => $post->id,
                'key' => 'excerpt',
                'value' => json_encode($request->socials),
            ]);

            $post->description()->create([
                'post_id' => $post->id,
                'key' => 'description',
                'value' => $request->description,
            ]);

            $preview = $this->saveFile($request, 'profile_picture');

            $post->preview()->create([
                'post_id' => $post->id,
                'key' => 'preview',
                'value' => $preview,
            ]);

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollback();
            Toastr::danger($th->getMessage());
            return back();
        }

        return to_route('admin.investors.index');
    }



    public function edit($id)
    {
        $segments = request()->segments();
        $buttons = [
            [
                'name' => __('Back'),
                'url' => route('admin.investors.index'),
            ]
        ];
        $info = Post::with('description', 'preview', 'excerpt')->where('type', 'investor')->findOrFail($id);
        $socials = json_decode($info->excerpt->value ?? '');

        return Inertia::render('Admin/Investors/Edit', [
            'buttons' => $buttons,
            'segments' => $segments,
            'info' => $info,
            'socials' => $socials,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        $request->validate([
            'name' => 'required|max:150',
            'position' => 'required|max:100',
            'profile_picture' => 'nullable|image|max:2000',
            'description' => 'required|max:1000',
        ]);


        DB::beginTransaction();
        try {

            $post = Post::with('preview')->findOrFail($id);

            $post->title = $request->name;
            $post->slug = $request->position;
            $post->status = $request->status ? 1 : 0;
            $post->type = 'investor';
            $post->save();

            $post->excerpt()->update([
                'post_id' => $post->id,
                'key' => 'excerpt',
                'value' => json_encode($request->socials),
            ]);

            $post->description()->update([
                'post_id' => $post->id,
                'key' => 'description',
                'value' => $request->description,
            ]);


            if ($request->hasFile('profile_picture')) {
                $preview = $this->saveFile($request, 'profile_picture');

                !empty ($post->preview) ? $this->removeFile($post->preview->value) : '';

                $post->preview()->update([
                    'post_id' => $post->id,
                    'key' => 'preview',
                    'value' => $preview,
                ]);
            }

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollback();

            return response()->json([
                'message' => $th->getMessage()
            ], 500);
        }

        Toastr::success(__('Updated successfully'));

        return redirect()->route('admin.investors.index');
    }


    public function destroy($id)
    {
        $post = Post::where('type', 'investor')->with('preview')->findOrFail($id);

        if (!empty ($post->preview)) {
            $this->removeFile($post->preview->value);
        }

        $post->delete();

        return back();
    }
}
