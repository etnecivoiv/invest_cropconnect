<?php

namespace App\Http\Controllers\Admin;

use Auth;
use Inertia\Inertia;
use App\Models\Option;
use App\Traits\Uploader;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\PageHeader;
use Illuminate\Support\Facades\Cache;

class SeoController extends Controller
{

    use Uploader;

    public function __construct()
    {
        $this->middleware('permission:seo');
    }

    public function index()
    {
        $posts = Option::where('key', 'LIKE', '%seo%')->get()->map(function ($query) {
            $data['key'] = str_replace('_', ' ', str_replace('seo_', '', $query->key));
            $data['id'] = $query->id;
            $data['content'] = $query->value;

            return $data;
        });

        return Inertia::render('Admin/Seo/Index', compact('posts'));
    }


    public function edit($id)
    {
        $seo = Option::where('key', 'LIKE', '%seo%')->where('id', $id)->value('value');

        PageHeader::set()->title(__('Edit SEO'))->buttons([
            [
                'name' => __('Back'),
                'url' => route('admin.seo.index'),
            ]
        ]);

        return Inertia::render('Admin/Seo/Show', [
            'id' => $id,
            'seo' => $seo,
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'preview' => ['nullable', 'image', 'max:1024']
        ]);

        $option = Option::where('id', $id)->firstOrNew();
        $meta = $request->except('_method') ?? $option->value ?? [];

        if ($request->hasFile('preview')) {
            $this->removeFile($meta['preview']);
            $meta['preview'] = $this->uploadFile('preview');
        }

        $option->value = $meta;
        $option->save();

        Cache::forget($option->key);

        return to_route('admin.seo.index');
    }
}
