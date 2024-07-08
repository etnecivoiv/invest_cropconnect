<?php

namespace App\Http\Controllers\Admin;

use App\Models\ReferHistory;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Inertia\Inertia;

class ReferHistoryController extends Controller
{
    public function __invoke()
    {

        $segments = request()->segments();
        $buttons = [
            
        ];
        $histories = ReferHistory::with(['referUser', 'referralUser'])->paginate();
        return Inertia::render('Admin/Referrals/History', [
            'histories' => $histories,
            'buttons' => $buttons,
            'segments' => $segments,
        ]);
    }
}
