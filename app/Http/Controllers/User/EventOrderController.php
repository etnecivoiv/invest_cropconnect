<?php

namespace App\Http\Controllers\User;

use Inertia\Inertia;
use App\Models\EventOrder;
use Illuminate\Http\Request;
use App\Traits\Notifications;
use App\Http\Controllers\Controller;
use App\Models\Event;

class EventOrderController extends Controller
{
    use Notifications;

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

        $orders = $orders->with('user', 'event', 'gateway')->where('user_id', auth()->id())->latest()->paginate(20);

        $totalOrders = EventOrder::count();
        $totalPendingOrders = EventOrder::where('status', 2)->where('user_id', auth()->id())->count();
        $totalCompleteOrders = EventOrder::where('status', 1)->where('user_id', auth()->id())->count();
        $totalDeclinedOrders = EventOrder::where('status', 0)->where('user_id', auth()->id())->count();
        $type = $request->type ?? 'email';

        $invoice = get_option('invoice_data', true);
        $currency = get_option('base_currency', true);
        $tax = get_option('tax');

        return Inertia::render('User/EventOrder/Index', [
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
                'url' => '/user/event-orders'
            ],

        ];
        $order  = EventOrder::with('user', 'event', 'gateway')->where('user_id', auth()->id())->findOrFail($id);
        $invoice_data = get_option('invoice_data', true);
        $meta = json_decode($order->meta ?? '');
        $event = $order->event;

        return Inertia::render('User/EventOrder/Show', [
            'segments' => $segments,
            'buttons' => $buttons,
            'order' => $order,
            'event' => $event,
            'invoice_data' => $invoice_data,
            'meta' => $meta
        ]);
    }

    public function ticket($id)
    {
        /**
         * @var \App\Models\User
         */
        $user = auth()->user();
        $eventOrder = $user->eventOrders()->findOrFail($id);
        
  
        if ($eventOrder) {
            $meta = (array) json_decode($eventOrder->meta);
            if (isset($meta['qr_code']) && is_file(public_path($meta['qr_code']))) {
                $ticket = $meta['ticket'];
            } else {
                $ticket = $eventOrder->event->generateAuthUserTicket();
            }

            return response()->download(public_path($ticket));
        }
 

    }
}
