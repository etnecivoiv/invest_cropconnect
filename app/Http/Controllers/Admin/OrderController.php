<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Invest;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Traits\Notifications;
use DB;
use Auth;
use Inertia\Inertia;

class OrderController extends Controller
{
    use Notifications;

    public function __construct()
    {
        $this->middleware('permission:order');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $segments = request()->segments();
        $buttons = [
            [
                'name' => '<i class="bx bx-file"></i>&nbsp&nbsp' . __('Invoice Settings'),
                'url' => '#',
                'target' => '#invoiceSettingDrawer',
            ],
            [
                'name' => '<i class="bx bx-dollar"></i>&nbsp&nbsp' . __('Currency Settings'),
                'url' => '#',
                'target' => '#currencySettingDrawer',
            ],
            [
                'name' => '<i class="bx bx-cog"></i>&nbsp&nbsp' . __('Tax Settings'),
                'url' => '#',
                'target' => '#taxSettingDrawer',
            ]
        ];

        $searchColumn = ['invoice_no', 'status'];
        $orders = Order::query()
            ->with(['user', 'project', 'gateway'])
            // filter by invoice_no and status
            ->when(in_array(request('type'), $searchColumn), function ($query) {
                $query->where(request('type'), 'LIKE', '%' . request('search') . '%');
            })
            // filter by project name
            ->when(request('type') == 'project_title', function ($query) {
                $query->whereHas('project', function ($query) {
                    $query->where('title', 'LIKE', '%' . request('search') . '%');
                });
            })
            ->latest()
            ->paginate(20);

        $totalOrders = Order::count();
        $totalPendingOrders = Order::where('status', 2)->count();
        $totalCompleteOrders = Order::where('status', 1)->count();
        $totalDeclinedOrders = Order::where('status', 0)->count();
        $type = $request->type ?? 'email';

        $invoice = get_option('invoice_data', true);
        $currency = get_option('base_currency', true);
        $tax = get_option('tax',true);
        
     
        $tax = $tax['tax'];

        return Inertia::render('Admin/Order/Index', [
            'segments' => $segments,
            'buttons' => $buttons,
            'orders' => $orders,
            'request' => $request,
            'totalOrders' => $totalOrders,
            'totalPendingOrders' => $totalPendingOrders,
            'totalCompleteOrders' => $totalCompleteOrders,
            'totalDeclinedOrders' => $totalDeclinedOrders,
            'type' => $type,
            'invoice' => $invoice,
            'currency' => $currency,
            'tax' => $tax
        ]);
    }



    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        $segments = request()->segments();
        $buttons = [
            [
                'name' => __('Orders'),
                'url' => '/admin/order'
            ],

        ];
        $order  = Order::with('user', 'project', 'gateway')->findOrFail($id);
        $invoice_data = get_option('invoice_data', true);
        $meta = json_decode($order->meta ?? '');
        $project_durations = Invest::query()
            ->select('order_id', 'project_duration_id', 'qty')
            ->with(['project_duration'])
            ->where('order_id', $order->id)->get()->map(function ($invest) {
                $invested = $invest->project_duration;
                $invested['qty'] = $invest->qty;
                return $invested;
            });
        return Inertia::render('Admin/Order/Show', [
            'segments' => $segments,
            'buttons' => $buttons,
            'order' => $order,
            'project_durations' => $project_durations,
            'invoice_data' => $invoice_data,
            'meta' => $meta
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $order  = Order::with('user')->findOrFail($id);
        $order->status = $request->status;
        $order->save();

        $status = $order->status == 2 ? 'pending' : ($order->status == 1 ? 'approved' : 'declined');
        $title = '(' . $order->invoice_no . ') Investment is ' . $status;

        $notification['user_id'] = $order->user_id;
        $notification['title']   = $title;
        $notification['url'] = '/user/investments';

        $this->createNotification($notification);

        return back();
    }
}
