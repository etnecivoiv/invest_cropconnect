<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\CommissionHistory;
use App\Models\Invest;
use App\Models\ReturnTransaction;
use App\Models\User;
use App\Models\WalletTransaction;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    function getDateFormat($filterType)
    {
        return match ($filterType) {
            'year' => "%Y",
            'month' => "%M %Y",
            'week' => "%a",
            default => "%h",
        };
    }
    protected function applyFilters($query, $filterType, $table)
    {
        return $query->when($filterType == 'day', function ($query) use ($table) {
            $query->whereDate("$table.created_at", today())
                ->groupByRaw("HOUR($table.created_at)");
        })->when($filterType == 'week', function ($query) use ($table) {
            $start = now()->startOfWeek(Carbon::SATURDAY);
            $end = now()->endOfWeek(Carbon::FRIDAY);
            $query->whereBetween("$table.created_at", [$start, $end])
                ->groupByRaw("DAY($table.created_at)");
        })->when($filterType == 'month', function ($query) use ($table) {
            $query->whereYear("$table.created_at", now()->year)
                ->groupByRaw("MONTH($table.created_at)");
        })->when($filterType == 'year', function ($query) use ($table) {
            $query->groupByRaw("YEAR($table.created_at)");
        });
    }

    public function index(Request $request)
    {
        $totalInvest = Invest::where('user_id', auth()->id())->sum('amount');
        $totalProfit = ReturnTransaction::where('user_id', auth()->id())
            ->where('type', 1)
            ->sum('amount');

        $totalDeposits = WalletTransaction::where('user_id', auth()->id())->where('status', 1)->sum('amount');

        $recentDeposits = WalletTransaction::where('user_id', auth()->id())->where('status', 1)->take(5)->get();
        $recentInvests = Invest::where('user_id', auth()->id())
            ->with(['project_duration', 'project_duration.project'])->latest()->take(8)->get();
        // // chart
        $returnFilter = request('returns') ?? 'day';
        $pieChartFilter = request('pie') ?? 'week';
        $dateFormat = match ($returnFilter) {
            'year' => "%Y",
            'month' => "%M %Y",
            'week' => "%a",
            default => "%h",
        };
        $profitOverview = ReturnTransaction::query()->where('user_id', auth()->id())
            ->selectRaw(
                "DATE_FORMAT(return_transactions.created_at, '$dateFormat') as date,
                SUM(CASE WHEN type = 0 THEN return_transactions.amount ELSE 0 END) as losses,
                SUM(CASE WHEN type = 1 THEN return_transactions.amount ELSE 0 END) as profits"
            );


        $pendingCh = CommissionHistory::query()->where('user_id', auth()->id())->where('status', 0);
        $approvedCh = CommissionHistory::query()->where('user_id', auth()->id())->where('status', 1);
        $declinedCh = CommissionHistory::query()->where('user_id', auth()->id())->where('status', 2);

        $pieChartData = [
            'pending' => $this->applyFilters($pendingCh, $pieChartFilter, 'commission_histories')->sum('commission_amount'),
            'approved' =>  $this->applyFilters($approvedCh, $pieChartFilter, 'commission_histories')->sum('commission_amount'),
            'declined' =>  $this->applyFilters($declinedCh, $pieChartFilter, 'commission_histories')->sum('commission_amount'),
        ];

        $totalRefers = User::query()->where('uplink_id', auth()->id())->count();

        return Inertia::render('User/Dashboard', [
            'totalInvest' => amount_format($totalInvest, ''),
            'totalProfit' => amount_format($totalProfit, ''),
            'totalDeposits' => amount_format($totalDeposits, ''),
            'profitOverview' => $this->applyFilters($profitOverview, $returnFilter, 'return_transactions')->get(),
            'recentDeposits' => $recentDeposits,
            'recentInvests' => $recentInvests,
            'request' => $request,
            'pieChartData' => $pieChartData,
            'totalRefers' => $totalRefers
        ]);
    }
}
