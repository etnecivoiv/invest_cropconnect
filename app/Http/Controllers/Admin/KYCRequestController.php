<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\KYCRequest;
use App\Models\Notification;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class KYCRequestController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:kyc-requests');
    }

    public function index(Request $request)
    {
        $all = KYCRequest::count();
        $approved = KYCRequest::where('status', '1')->count();
        $pending = KYCRequest::where('status', '0')->count();
        $rejected = KYCRequest::where('status', '2')->count();
        $reSubmitted = KYCRequest::where('status', '3')->count();

        $requests = KYCRequest::with('user', 'method')
            ->when($request->get('status') !== null, function (Builder $query) use ($request) {
                $type = $request->get('status');
                $query->where('status', '=', $type);
            })
            ->when($request->has('user'), function (Builder $query) use ($request) {
                $query->where('user_id', '=', $request->user);
            })
            ->when($request->get('src') !== null, function (Builder $query) use ($request) {
                $query->whereHas('user', function (Builder $query) use ($request) {
                    $query->where('name', 'LIKE', '%' . $request->get('src') . '%')
                        ->orWhere('username', 'LIKE', '%' . $request->get('src') . '%')
                        ->orWhere('phone', 'LIKE', '%' . $request->get('src') . '%')
                        ->orWhere('email', 'LIKE', '%' . $request->get('src') . '%');
                });
            })
            ->latest()
            ->paginate(10);

        return Inertia::render('Admin/KYC/Requests/Index', compact('requests', 'all', 'approved', 'pending', 'rejected', 'reSubmitted'));
    }

    public function store(Request $request)
    {



        $request->validate([
            'request' => ['required', 'exists:kyc_requests,id'],
            'status' => ['required', Rule::in('approve', 'reject', 'pending', 'approve_all')],
        ]);

        if ($request->get('status') == 'approve' || $request->get('status') == 'approve_all') {
            $status = 1;
        } elseif ($request->get('status') == 'reject') {
            $status = 2;
        } else {
            $status = 0;
        }

        $KYCRequest = KYCRequest::findOrFail($request->get('request'));

        DB::transaction(function () use ($request, $status, $KYCRequest) {

            $KYCRequest->update([
                'status' => $status,
                'rejected_at' => $status == 2 ? today() : null,
            ]);

            $user = $KYCRequest->user;
            if ($request->get('status') == 'approve_all' && $user) {
                $user->kyc_verified_at = now();
                $user->save();
            }

            Notification::create([
                'user_id' => $user->id,
                'url' => route('user.kyc.show', $KYCRequest),
                'title' => __('KYC has been verified'),
                'comment' => __('Your KYC verification request has been approved successfully'),
                'is_admin' => 0,
            ]);
        });

        return back();
    }

    public function show(KYCRequest $kycRequest)
    {

        $segments = request()->segments();
        $buttons = [
            [
                'name' => '<i class="bx bx-list"></i>&nbsp&nbsp' . __('Back'),
                'url' => route('admin.kyc-requests.index'),
            ],
        ];
        $kycRequest->load('user', 'method');
        return Inertia::render('Admin/KYC/Requests/Show', compact('kycRequest', 'segments', 'buttons'));
    }

    public function destroy(KYCRequest $KYCRequest)
    {
        $KYCRequest->delete();

        return back();
    }

    public function destroyMass(Request $request)
    {
        foreach ($request->input('ids') as $id) {
            $plan = KYCRequest::findOrFail($id);
            $plan->delete();
        }

        return back();
    }
}
