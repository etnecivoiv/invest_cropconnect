<?php

namespace App\Http\Controllers\User;

use Inertia\Inertia;
use App\Services\Toastr;
use App\Traits\Uploader;
use Illuminate\Support\Str;
use App\Models\Notification;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserPanelController extends Controller
{
    use Uploader;

    public function accountSetting()
    {
        $user = Auth::user();
        return Inertia::render('User/AccountSettings', compact('user'));
    }

    public function accountSettingUpdate(Request $request)
    {
        /**
         * @var \App\Models\User
         */
        $user = auth()->user();

        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'unique:users,phone,' . request()->user()->id],
        ]);

        if (!$user->provider_id) {
            $request->validate([
                'email' => ['required', 'email', 'max:255', 'unique:users,email,' . request()->user()->id],
                'current_password' => ['required', 'current_password'],
            ]);
        }

        if ($request->hasFile('avatar')) {
            $request->validate([
                'avatar' => ['required', 'image', 'max:1024'],
            ]);
            $user->avatar = $this->uploadFile('avatar', $user->avatar);
            $user->save();
        }

        $user->update([
            'name' => $request->get('name'),
            'email' => $request->get('email'),
            'phone' => $request->get('phone'),
        ]);

        Toastr::success(__('Account Settings Updated Successfully'));

        return back();
    }

    public function changePassword()
    {
        return Inertia::render('User/ChangePassword');
    }

    public function updatePassword(Request $request)
    {
        $request->validate([
            'current_password' => ['required', 'current_password'],
            'new_password' => ['required', 'confirmed'],
        ]);

        /**
         * @var \App\Models\User
         */
        $user = auth()->user();
        $user->password = Hash::make($request->get('new_password'));
        $user->save();

        Toastr::success(__('Password Updated Successfully'));

        return back();
    }

    public function editProfile()
    {
        /**
         * @var \App\Models\User
         */
        $user = auth()->user();
        return Inertia::render('User/EditProfile', compact('user'));
    }

    public function userNotifications()
    {
        return
            request()
            ->user()
            ->hasMany(Notification::class)
            ->where('is_admin', 0)
            ->limit(5)
            ->get()->map(function ($item) {
                $item->title_short = Str::limit($item->title, 30, '...');
                $item->comment_short = Str::limit($item->comment, 35, '...');
                return $item;
            });
    }

    public function userNotificationsRead(Notification $notification)
    {
        $notification->seen = 1;
        $notification->save();
        return response()->json([
            'success' => true,
        ]);
    }
}
