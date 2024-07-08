<?php

namespace App\Http\Controllers\Auth;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Providers\RouteServiceProvider;
use App\Http\Requests\Auth\LoginRequest;
use App\Services\SeoMeta;
use Illuminate\Validation\ValidationException;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        SeoMeta::init('seo_login');

        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
            'googleClient' => env('GOOGLE_CLIENT_ID'),
            'facebookClient' => env('FACEBOOK_CLIENT_ID'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request)
    {
        $request->authenticate();

        if (auth()->user()->deleted_at) {
            auth()->logout();
            throw ValidationException::withMessages([
                'email' => trans('This account has been temporary inactive, please contact with admin to get back'),
            ]);
        }

        $request->session()->regenerate();
        return inertia()->location(route(Auth::user()->getDashboardRoute()));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return inertia()->location('/');
    }
}
