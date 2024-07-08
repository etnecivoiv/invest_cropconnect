<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\ReturnTransaction;
use App\Services\PageHeader;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfitReturnController extends Controller
{
    public function __invoke()
    {

        PageHeader::set()->title('Profit return');

        $returnTransactions = ReturnTransaction::query()
            ->with('project_duration.project')
            ->where('user_id', auth()->id())
            ->when(request('search'), function ($query) {
                $this->applySearchFilter($query);
            })
            ->latest()
            ->paginate();

        $total = ReturnTransaction::query()->count();
        $totalProfited = ReturnTransaction::query()->where('type', 1)->count();
        $totalLoss = ReturnTransaction::query()->where('type', 0)->count();

        return Inertia::render('User/ProfitReturn/Index', [
            'returnTransactions' => $returnTransactions,
            'total' => $total,
            'totalProfited' => $totalProfited,
            'totalLoss' => $totalLoss,
        ]);
    }

    protected function applySearchFilter($query)
    {
        if (request('type') == 'project_title') {

            $query->whereHas('project_duration', function ($q) {
                $q->whereHas('project', function ($q2) {
                    $q2->where('title', 'like', '%' . request('search') . '%');
                });
            });
        }
    }
}
