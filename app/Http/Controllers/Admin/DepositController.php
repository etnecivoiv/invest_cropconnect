<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\WalletTransaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DepositController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $segments = request()->segments();
        $buttons = [
           
        ];
        $histories = WalletTransaction::with('gateway', 'user')
            ->when(request('search_in') == 'tnx', fn ($q) => $q->where('payment_id', 'LIKE', "%" . request('keyword') . "%"))
            ->paginate();

        return Inertia::render('Admin/Logs/WalletTransactions/Index', compact('histories', 'segments', 'buttons'));
    }

   
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $segments = request()->segments();
        $buttons = [
            [
                'name' => '<i class="fa fa-list"></i>&nbsp' . __('Back'),
                'url' => route('admin.deposit-logs.index'),
            ]
        ];

        $history = WalletTransaction::with(['gateway', 'user'])->findOrFail($id);
        $history->meta = json_decode($history->meta);

        return Inertia::render('Admin/Logs/WalletTransactions/Show', compact('history', 'segments', 'buttons'));
    }

   

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        /**
         * @var \App\Models\WalletTransaction
         */
        $history =      WalletTransaction::findOrFail($id);
        $history->status = $request->status;
        $user = $history->user;
        $user->wallet += $history->amount;

        DB::transaction(function () use ($user, $history) {
            $user->save();
            $history->save();
        });

        return back();
    }

   
}
