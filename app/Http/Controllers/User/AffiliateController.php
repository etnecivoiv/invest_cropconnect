<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\CommissionHistory;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AffiliateController extends Controller
{
    public function index()
    {
        $referLink = auth()->user()->getReferLink();

        $totalRefers = User::query()->where('uplink_id', auth()->id())->count();
        $commissions = CommissionHistory::query()->where('user_id', auth()->id())
            ->latest()
            ->paginate();
        $totalCommissions = CommissionHistory::query()
            ->where('user_id', auth()->id())
            ->where('status', 1)
            ->sum('commission_amount');
        return Inertia::render('User/Affiliate', [
            'referLink' => $referLink,
            'totalRefers' => $totalRefers,
            'commissions' => $commissions,
            'totalCommissions' => $totalCommissions
        ]);
    }
}
