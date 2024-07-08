<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\Toastr;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Spatie\Newsletter\Facades\Newsletter;

class NewsletterController extends Controller
{
    public function subscribe(Request $request)
    {
        $request->validate([
            "email" => ['required', 'email:rfc,dns'],
        ]);

        try {
            Newsletter::subscribe($request->email);
            Toastr::success(__('You have successfully subscribed to our newsletter.'));
        } catch (\Throwable $th) {
            throw ValidationException::withMessages([
                "email" => [$th->getMessage()],
            ]);
        }

        return back();
    }
}
