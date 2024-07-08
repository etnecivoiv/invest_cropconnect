<?php

namespace App\Traits;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

trait Uploader
{

    //upload file
    private function saveFile(Request $request, $input, $absolutePath = false)
    {
        $file = $request->file($input);
        $ext = $file->extension();
        $filename = Str::random(20) . '.' . $ext;

        $path = 'uploads' . date('/y') . '/' . date('m') . '/';

        if (env('APP_ENV') == 'demo') {
            $path = 'demo/';
        }

        $filePath = $path . $filename;

        Storage::put($filePath, file_get_contents($file));

        if ($absolutePath || env('APP_ENV') == 'demo') {
            return '/' . $filePath;
        }

        

        return Storage::url($filePath);
    }
    //upload file from url/link
    private function saveFileFromUrl($url, $ext = '.png', $file = '', $type = 'image')
    {
        if (empty($file)) {
            $context = stream_context_create([
                'http' => [
                    'method' => 'GET',
                    'header' => "Accept-language: en\r\n"
                ]
            ]);
            $file = fopen($url, 'r', false, $context);
        }
        $filename = $type . '_' . uniqid() . $ext;

        $filePath = 'uploads/' . $filename;
        Storage::put($filePath, $file);

        return Storage::url($filePath);
    }

    //upload multiple files
    private function multipleSaveFile(Request $request, $input)
    {
        $files = $request->file($input);
        $filePaths = [];

        foreach ($files as $file) {
            $ext = $file->extension();
            $filename = now()->timestamp . Str::random(20) . '.' . $ext;

            $path = 'uploads' . date('/y') . '/' . date('m') . '/';

            if (env('APP_ENV') == 'demo') {
                $path = 'demo/';
            }

            $filePath = $path . $filename;

            Storage::put($filePath, file_get_contents($file));

            $filePaths[] = Storage::url($filePath);
        }

        return $filePaths;
    }

    //remove file
    public function removeFile($url = null)
    {
        if (empty($url)) {
            return true;
        }

        $fileName = explode('uploads', $url);
        if (isset($fileName[1])) {
            $exists_file = 'uploads' . $fileName[1];
            if (Storage::exists($exists_file)) {
                Storage::delete($exists_file);
            }
            return true;
        }

        return false;
    }

    private function uploadFile($input, $fallback = null): string|null
    {
        $file = $input;

        if (!($input instanceof UploadedFile)) {
            if (!request()->hasFile($input)) return $fallback;
            $file = request()->file($input);
        }

        $ext = $file->extension();
        $filename = Str::random(20) . '.' . $ext;
        $path = '/uploads' . date('/y') . '/' . date('m') . '/';

        if (env('APP_ENV') == 'demo') {
            $path = '/demo/';
        }

        $filePath = $path . $filename;
        Storage::put($filePath, file_get_contents($file));
        return $filePath;
    }

    public function unlinkPublicFile(string $url = null): void
    {
        if ($url) {
            $file_url = public_path($url);
            if (is_file($file_url)) {
                unlink($file_url);
            }
        }
    }

    function fileSizeInMB($url)
    {
        $filePath = str_replace(env('APP_URL'), '', $url);
        $sizeInBytes = Storage::size($filePath);
        return round($sizeInBytes / 1024 / 1024, 3);
    }
}
