<?php

namespace App\Http\Controllers\User;

use Inertia\Inertia;
use App\Models\Invest;
use App\Services\PageHeader;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class InvestmentController extends Controller
{
    function index()
    {
        PageHeader::set()->title(__('Investments Histories'));

        $investmentsQuery = Invest::query()->where('user_id', auth()->id());

        $statsCounter = [
            'total' => $investmentsQuery->clone()->count(),
            'pending' => $investmentsQuery->clone()->where('status', 'pending')->count(),
            'active' => $investmentsQuery->clone()->where('status', 'active')->count(),
            'declined' => $investmentsQuery->clone()->where('status', 'declined')->count(),
        ];

        $investments =  $investmentsQuery
            ->with('project', 'project_duration')
            ->latest()
            ->when(request('search'), function ($query) {
                $search = request('search');
                $likeSearch = '%' . $search . '%';
                match (request('type')) {
                    'invoice_no' => $query->where('invoice_no', 'LIKE', $likeSearch),
                    'project_title' =>  $query->whereHas('project', fn ($q) => $q->where('title', 'LIKE', $likeSearch)),
                };
            })
            ->paginate();

        return Inertia::render('User/Investments/Index', [
            'investments' => $investments,
            'statsCounter' => $statsCounter
        ]);
    }

    public function show(Invest $investment)
    {
        $segments = request()->segments();
        $buttons = [
            [
                'name' => __('Investments'),
                'url' => '/user/investments'
            ],

        ];
        $order  = $investment->order->load('user');


        $invoice_data = get_option('invoice_data', true);
        $meta = json_decode($order->meta ?? '');

        return Inertia::render('User/Investments/Show', [
            'segments' => $segments,
            'buttons' => $buttons,
            'investment' => $investment,
            'order' => $order,
            'project' => $order->project,
            'invoice_data' => $invoice_data,
            'meta' => $meta
        ]);
    }
}
