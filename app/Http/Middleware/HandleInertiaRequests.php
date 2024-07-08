<?php

namespace App\Http\Middleware;

use App\Models\Menu;
use App\Models\Notification;
use App\Services\PageHeader;
use App\Services\SeoMeta;
use App\Services\Toastr;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Session;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     * @var string
     */
    // protected $rootView = 'app';


    public function rootView(Request $request)
    {
        $segments = $request->segments();
        $segment = $segments[0] ?? null;
        $layoutName = in_array($segment, ['admin', 'user']) ? 'admin' : 'default';
        $layoutPath = 'layouts.' . $layoutName;
        return $layoutPath;
    }

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Defines the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function share(Request $request): array
    {
        if (request()->is('install/*') || !file_exists(base_path('public/uploads/installed'))) {
            return [];
        }
        
        $primaryData = get_option('primary_data', true, true);

        $headerFooter = get_option('header_footer', true, true);
        $locale = Session::get('locale', env('DEFAULT_LANG', 'en'));
        $menu = Cache::remember(
            'menu_' . $locale,
            env('CACHE_LIFETIME', 1800),
            function () use ($locale) {
                return Menu::where('status', 1)->where('lang', $locale)->oldest()->get();
            }
        );
        $app_name = Cache::remember(
            'app_name_' . $locale,
            env('CACHE_LIFETIME', 1800),
            function () {
                return env('APP_NAME', 'Laravel');
            }
        );

        $permissions = [];
        $notifications = collect([]);

        if (auth()->check()) {
            /**
             * @var \App\Models\User
             */
            $user = auth()->user();
            $notifications = $user->notificationMessages()->latest()->get();

            if ($user->isAdmin()) {
                $permissions = $user->getAllPermissions()->pluck('name');
                $notifications = Notification::query()->where('is_admin', 1)->where('seen',0)->latest()->get();
            }
        }

        $notifications = $notifications->where('seen', 0);

        return array_merge(parent::share($request), [
            'auth' => [
                'isLoggedIn' => auth()->check(),
                'csrf' => csrf_token(),
                'flash' => session('flash'),
                'name' => auth()->check() ? auth()->user()->name : null,
            ],
            'user' => auth()->check() ? auth()->user() : null,
            'sassError' => $request->session()->get('sass_error'),
            'languages' => get_option('languages', true),
            'seoMeta' => fn() => SeoMeta::get(),
            'currency' => get_option('base_currency', true),
            'menus' => $menu,
            'primaryData' => $primaryData,
            'headerFooter' => $headerFooter,
            'app_name' => $app_name,
            'permissions' => $permissions,
            'notifications' => fn() => $notifications,
            'pageHeader' => fn() => PageHeader::toArray(),
            'toast' => fn() => Toastr::Toast(),
        ]);
    }
}
