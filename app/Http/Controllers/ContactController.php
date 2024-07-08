<?php

namespace App\Http\Controllers;

use Exception;
use Inertia\Inertia;
use App\Mail\ContactMail;
use App\Services\SeoMeta;
use App\Services\Toastr;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function index()
    {

        $contactPage = get_option('contact_page', true, true);
        $seo = SeoMeta::init('seo_contact');
        return Inertia::render('Web/Contact', compact('contactPage', 'seo'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:20'],
            'email' => 'required|email|max:40',
            'subject' => 'required|max:100',
            'message' => 'required|max:500',
        ]);


        $data['name'] = $request->name;
        $data['email'] = $request->email;
        $data['subject'] = $request->subject;
        $data['message'] = $request->message;

        Mail::to(env('MAIL_TO'))->send(new ContactMail($data));

        Toastr::success('Mail sent successfully');

        return back();
    }
}
