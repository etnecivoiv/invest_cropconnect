<?php

namespace App\Http\Controllers\Admin;

use Carbon\Carbon;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Invest;
use Illuminate\Http\Request;
use App\Models\ReturnTransaction;
use App\Models\WalletTransaction;
use App\Http\Controllers\Controller;
use App\Models\CommissionHistory;
use App\Models\Event;
use App\Models\Project;

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


    public function __invoke(Request $request)
    {
        $totalInvest = Invest::query();
        $totalProfit = ReturnTransaction::where('type', 1)
            ->sum('amount');
        $totalLosses = ReturnTransaction::where('type', 0)
            ->sum('amount');

        $totalDeposits = WalletTransaction::where('status', 1);
        $totalCommissions = CommissionHistory::where('status', 1);
        $totalRefers = User::query()->where('uplink_id', auth()->id())->count();
        $totalUsers = User::query()->where('role', '!=', 'admin')->count();
        $totalProjects = Project::query()->count();

        $recentDeposits = WalletTransaction::where('status', 1)->latest()->take(5)->get();
        $recentEvents = Event::take(5)->latest()->get();
        $recentInvests = Invest::where('status', 1)
            ->with(['project_duration', 'project_duration.project'])->latest()->take(8)->get();
        // // chart
        $returnFilter = request('returns') ?? 'day';
        $depositFilter = request('deposit') ?? 'day';
        $pieChartFilter = request('pie') ?? 'week';
        $dateFormatReturn = $this->getDateFormat($returnFilter);
        $dateFormatDeposit = $this->getDateFormat($depositFilter);

        $profitOverview = ReturnTransaction::query()
            ->selectRaw("DATE_FORMAT(return_transactions.created_at, '$dateFormatReturn') as date,
            SUM(CASE WHEN type = 0 THEN amount ELSE 0 END) as losses,
            SUM(CASE WHEN type = 1 THEN amount ELSE 0 END) as profits");
        $depositOverview = WalletTransaction::query()
            ->selectRaw(
                "DATE_FORMAT(wallet_transactions.created_at, '$dateFormatDeposit') as date,
                SUM(wallet_transactions.amount) as deposit"
            );

        $pieChartData = [
            'invest' => $this->applyFilters($totalInvest, $pieChartFilter, 'invests')->sum('amount'),
            'deposits' => $this->applyFilters($totalDeposits, $pieChartFilter, 'wallet_transactions')->sum('amount'),
            'commissions' => $this->applyFilters($totalCommissions, $pieChartFilter, 'commission_histories')->sum('commission_amount'),
        ];
        return Inertia::render('Admin/Dashboard', [
            'totalInvest' => amount_format($totalInvest->sum('amount'), ''),
            'totalProfit' => amount_format($totalProfit, ''),
            'totalDeposits' => amount_format($totalDeposits->sum('amount'), ''),
            'totalRefers' => $totalRefers,
            'profitOverview' => $this->applyFilters($profitOverview, $returnFilter, 'return_transactions')->get(),
            'recentDeposits' => $recentDeposits,
            'recentInvests' => $recentInvests,
            'depositOverview' => $this->applyFilters($depositOverview, $depositFilter, 'wallet_transactions')->get(),
            'totalUsers' => $totalUsers,
            'totalProjects' => $totalProjects,
            'totalCommissions' => amount_format($totalCommissions->sum('commission_amount'), ''),
            'totalLosses' => amount_format($totalLosses, ''),
            'recentEvents' => $recentEvents,
            'pieChartData' => $pieChartData,
            'request' => $request,
        ]);
    }
}
