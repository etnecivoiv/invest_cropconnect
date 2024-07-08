<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ReturnTransaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReturnTransactionController extends Controller
{
    public function __invoke(Request $request)
    {
        $segments = request()->segments();
        $buttons = [];
        $type = $request->type ?? 'name';
        $returnTransactions = ReturnTransaction::query();
        if (!empty($request->search)) {
            if ($request->type == 'name') {
                $returnTransactions = $returnTransactions->whereHas('user', function ($q) use ($request) {
                    return $q->where('name', $request->search);
                });
            } else {
                $returnTransactions = $returnTransactions->where($request->type, 'LIKE', '%' . $request->search . '%');
            }
        }
        $returnTransactions = $returnTransactions
            ->with(['project_duration', 'project_duration.project', 'user:id,name'])
            ->latest()->paginate();

        $total = ReturnTransaction::query()->count();
        $totalProfited = ReturnTransaction::query()->where('type', 1)->count();
        $totalLoss = ReturnTransaction::query()->where('type', 0)->count();

        return Inertia::render('Admin/ReturnTransaction/Index', [
            'buttons' => $buttons,
            'segments' => $segments,
            'returnTransactions' => $returnTransactions,
            'total' => $total,
            'totalProfited' => $totalProfited,
            'totalLoss' => $totalLoss,
            'request' => $request,
            'type' => $type
        ]);
    }
}
