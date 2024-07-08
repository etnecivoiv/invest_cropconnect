<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use App\Services\Toastr;
use Illuminate\Support\Str;
use App\Models\ReferHistory;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Laravel\Socialite\Facades\Socialite;

class SocialLoginController extends Controller
{
    public function redirectTo($provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    public function handleCallback($provider)
    {


        $user = Socialite::driver($provider)->user();



        $findUser = User::where('provider_id', $user->id)
            ->where('provider', $provider)
            ->where('email', $user->email)
            ->updateOrCreate([
                'provider_id' => $user->id,
                'provider' => $provider,
                'email' => $user->email,
            ], [
                'name' => $user->name,
                'email_verified_at' => now(),
                'password' => null,
            ]);

        if (Session::has('uplink_id') && $findUser->wasRecentlyCreated) {
            $upLinkUser = User::find(Session::get('uplink_id'))->value('id');
            $findUser->uplink_id = $upLinkUser;
            $findUser->save();
            ReferHistory::create([
                'refer_user_id' => $findUser->id,
                'referral_user_id' => $upLinkUser->id,
            ]);
        }

        Auth::login($findUser);
        Toastr::success(__('Login Successfully'));
        return redirect('/');
    }
}
