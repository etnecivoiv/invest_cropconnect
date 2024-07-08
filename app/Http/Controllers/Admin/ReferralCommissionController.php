<?php

namespace App\Http\Controllers\admin;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\CommissionHistory;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class ReferralCommissionController extends Controller
{
    public function index()
    {

        $segments = request()->segments();
        $buttons = [
            [
                'name' => '<i class="bx bx-cog"></i>&nbsp&nbsp' . __('Commission Settings'),
                'url' => '#',
                'target' => '#commissionSettingDrawer',
            ]
        ];
        $commissions = CommissionHistory::with(['user', 'order.project'])->paginate();

        $affiliate_commission_percent = get_option('affiliate_commission_percent');
        return Inertia::render('Admin/Referrals/Commissions', [
            'commissions' => $commissions,
            'affiliate_commission_percent' => $affiliate_commission_percent,
            'buttons' => $buttons,
            'segments' => $segments,
            'total' => CommissionHistory::count(),
            'totalPending' => CommissionHistory::where('status', CommissionHistory::PENDING)->count(),
            'totalApproved' => CommissionHistory::where('status', CommissionHistory::APPROVED)->count(),
            'totalDeclined' => CommissionHistory::where('status', CommissionHistory::REJECTED)->count(),
        ]);
    }

    public function update(Request $request, $id)
    {
        DB::transaction(function () use ($request, $id) {
            $commission = CommissionHistory::findOrFail($id);
            if ($request->get('action') === CommissionHistory::APPROVED) {
                // distribute the commission to the user wallet
                $user = User::findOrFail($commission->user_id);
                $user->wallet = $user->wallet + $commission->commission_amount;
                $user->save();
                $commission->status = 1;
                $commission->save();
            }

            if ($request->get('action') === CommissionHistory::REJECTED) {
                $commission->status = 2;
                $commission->save();
            }
        });


        return back();
    }
}
