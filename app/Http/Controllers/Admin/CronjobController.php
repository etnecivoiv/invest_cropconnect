<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CronjobController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:cron-job');
    }
    public function __invoke()
    {
        $segments = request()->segments();

        $buttons = [];

        $jobs = [
            [
                'title' => __('Investment Profit Calculation'),
                'url' => 'curl -s ' . url('/cron/invest-profit-calculation'),
                'time' => __('Everyday')
            ]
        ];

        return Inertia::render('Admin/Cron/Index', compact('segments', 'buttons', 'jobs'));
    }
}
