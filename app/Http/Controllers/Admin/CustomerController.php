<?php

namespace App\Http\Controllers\Admin;

use Throwable;
use App\Models\Post;
use App\Models\User;
use Inertia\Inertia;
use App\Traits\Uploader;
use App\Services\PageHeader;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

class CustomerController extends Controller
{
    use Uploader;

    public function __construct()
    {
        $this->middleware('permission:customers');
    }

    public function index()
    {
        PageHeader::set()->title('Customers');

        $customers = User::where('role', 'user')->latest()->paginate();
        $totalCustomer =  User::where('role', 'user')->count();
        $totalActiveCustomer =  User::where('role', 'user')->where('status', 1)->count();
        $totalInActiveCustomer =  User::where('role', 'user')->where('status', 0)->count();

        return Inertia::render('Admin/Customers/Index', [
            'customers' => $customers,
            'totalCustomer' => $totalCustomer,
            'totalActiveCustomer' => $totalActiveCustomer,
            'totalInActiveCustomer' => $totalInActiveCustomer,
        ]);
    }

    public function show(User $customer)
    {
        PageHeader::set()->title('Customers')->buttons([
            [
                'name' => '<i class="fa fa-arrow-left"></i>&nbsp' . __('Back to list'),
                'url' => route('admin.customers.index'),
            ]
        ]);
        $customer->load(['uplink']);
        $orders = $customer->orders()->with('project','gateway')->paginate();
        $eventOrders = $customer->eventOrders()->with('event')->paginate();

        return Inertia::render('Admin/Customers/Show', compact('customer', 'orders', 'eventOrders'));
    }

    public function update(Request $request, User $customer)
    {
        $data = $request->validate([
            'name' => ['required'],
            'email' => ['required', 'email', 'unique:users,email,' . $customer->id],
            'phone' => ['nullable'],
            'address' => ['nullable'],
            'wallet' => ['required', 'numeric', 'min:0'],
            'email_verified_at' => ['boolean'],
            'kyc_verified_at' => ['boolean'],
            'status' => ['boolean'],
            'password' => ['nullable', 'min:4'],
        ]);

        $data['email_verified_at'] = $data['email_verified_at'] ? now() : null;
        $data['kyc_verified_at'] = $data['kyc_verified_at'] ? now() : null;
        $data['status'] = $data['status'] ? 1 : 0;

        if ($data['password']) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }

        $customer->update($data);

        return to_route('admin.customers.index');
    }

    public function destroy(User $customer)
    {
        $customer->delete();
        return back();
    }
}
