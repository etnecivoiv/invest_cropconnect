<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\EventOrder;
use Illuminate\Http\Request;
use App\Traits\Notifications;
use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\User;

class EventOrderController extends Controller
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
        $buttons = [];

        $orders = EventOrder::query();

        if (!empty($request->search)) {
            if ($request->type == 'email') {
                $orders = $orders->whereHas('user', function ($q) use ($request) {
                    return $q->where('email', $request->search);
                });
            } else {
                $orders = $orders->where($request->type, 'LIKE', '%' . $request->search . '%');
            }
        }

        $orders = $orders->with('user', 'event', 'gateway')->latest()->paginate(20);

        $totalOrders = EventOrder::count();
        $totalPendingOrders = EventOrder::where('status', 2)->count();
        $totalCompleteOrders = EventOrder::where('status', 1)->count();
        $totalDeclinedOrders = EventOrder::where('status', 0)->count();
        $type = $request->type ?? 'email';


        return Inertia::render('Admin/EventOrder/Index', [
            'segments' => $segments,
            'buttons' => $buttons,
            'orders' => $orders,
            'request' => $request,
            'totalOrders' => $totalOrders,
            'totalPendingOrders' => $totalPendingOrders,
            'totalCompleteOrders' => $totalCompleteOrders,
            'totalDeclinedOrders' => $totalDeclinedOrders,
            'type' => $type
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
                'url' => '/admin/event-orders'
            ],

        ];
        $order  = EventOrder::with('user', 'event', 'gateway')->findOrFail($id);
        $invoice_data = get_option('invoice_data', true);
        $meta = json_decode($order->meta ?? '');
        $event = $order->event;

        return Inertia::render('Admin/EventOrder/Show', [
            'segments' => $segments,
            'buttons' => $buttons,
            'order' => $order,
            'event' => $event,
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
        $order  = EventOrder::findOrFail($id);
        $order->status = $request->status;
        $order->save();

        $status = $order->status == 2 ? 'pending' : ($order->status == 1 ? 'approved' : 'declined');
        $title = '(' . $order->invoice_no . ') Event order is ' . $status;

        $notification['user_id'] = $order->user_id;
        $notification['title']   = $title;
        $notification['url'] = '/events/' . $order->event_id;

        $this->createNotification($notification);

        return back();
    }

    public function ticket(EventOrder $eventOrder)
    {
        $meta = (array) json_decode($eventOrder->meta);
        if (isset($meta['qr_code']) && is_file(public_path($meta['qr_code']))) {
            $ticket = $meta['ticket'];
        } else {
            $ticket = $eventOrder->generateAuthUserTicket();
        }

        return response()->download(public_path($ticket));
    }
}
