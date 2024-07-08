<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use App\Services\SeoMeta;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use App\Http\Controllers\Controller;
use App\Models\ReferHistory;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Session;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        SeoMeta::init('seo_register');

        if (request('ref')) {

            Session::put('uplink_id', request('ref'));
            return redirect('/register');
        }
        return Inertia::render('Auth/Register',[
            'googleClient' => env('GOOGLE_CLIENT_ID'),
            'facebookClient' => env('FACEBOOK_CLIENT_ID')
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:' . User::class,
            'password' => ['required', Rules\Password::defaults()],
            'role' => ['required', 'in:user'],

        ]);

        if (Session::has('uplink_id')) {
            $upLinkUser = User::find(Session::get('uplink_id'));
            $upLinkUser = $upLinkUser->id ?? null;
        } else {
            $upLinkUser = null;
        }


        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'user',
            'uplink_id' => $upLinkUser,
        ]);

        if ($upLinkUser) {
          
            ReferHistory::create([
                'refer_user_id' => $user->id,
                'referral_user_id' => $upLinkUser
            ]);
        }

        Auth::login($user);

        if (env('EMAIL_VERIFICATION', true)) {
            $user->sendEmailVerificationNotification();
            return to_route('verification.notice');
        }

        Session::forget('uplink_id');

        return inertia()->location(route($user->getDashboardRoute()));
    }
}
