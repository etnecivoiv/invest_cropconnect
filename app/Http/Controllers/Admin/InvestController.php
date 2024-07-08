<?php

namespace App\Http\Controllers\Admin;

use App\Models\Invest;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InvestController extends Controller
{
    public function index(Request $request)
    {
        $segments = request()->segments();
        $buttons = [];
        $type = $request->type ?? 'name';
        $investments = Invest::query();
        if (!empty($request->search)) {
            if ($request->type == 'name') {
                $investments = $investments->whereHas('user', function ($q) use ($request) {
                    return $q->where('name', $request->search);
                });
            } else {
                $investments = $investments->where($request->type, 'LIKE', '%' . $request->search . '%');
            }
        }
        $investments = $investments
            ->with(['project_duration', 'project_duration.project', 'user:id,name'])
            ->latest()->paginate();

        $total = Invest::query()->count();
        $totalInvested = Invest::query()->sum('amount');
        $totalQty = Invest::query()->sum('qty');

        return Inertia::render('Admin/Invest/Index', [
            'buttons' => $buttons,
            'segments' => $segments,
            'investments' => $investments,
            'total' => $total,
            'totalInvested' => $totalInvested,
            'totalQty' => $totalQty,
            'request' => $request,
            'type' => $type
        ]);
    }

    public function update(Request $request, Invest $invest)
    {
        $invest->update(['status' => $request->status]);

        return redirect()->back();
    }
}
