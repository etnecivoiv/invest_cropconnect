<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Event;
use App\Models\Gateway;
use App\Traits\Uploader;
use App\Models\EventOrder;
use Illuminate\Http\Request;
use App\Models\WalletTransaction;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class EventPaymentController extends Controller
{
    use Uploader;
    public function index() // view payment page
    {

        $event = Event::findOrFail(Session::get('event_id'));
        $seat_no = Session::get('seat_no');
        $payingAmount = Session::get('paying_amount');
        $qty = count($seat_no) ?? 1;
        $totalAmount = $payingAmount * $qty;

        $viewData = [
            'gateways' => Gateway::where('status', 1)->get(),
            'total' => $totalAmount,
            'error' => Session::has('error'),
            'minMax' => Session::has('min-max'),
            'minMaxMessage' => Session::get('min-max', ''),
            'user' => auth()->user(),
            'logo' => get_option('primary_data', true, true)?->logo ?? '',
            'invoice_data' => get_option('invoice_data', true),
            'event' => $event,
            'seat_no' => $seat_no
        ];

        return Inertia::render('Web/Events/Payment', $viewData);
    }

    public function store(Request $request) // process payment
    {
        $gateway = Gateway::where('status', 1)->findOrFail($request->gateway_id);
        $seat_no = Session::get('seat_no');
        $payingAmount = Session::get('paying_amount');
        $qty = count($seat_no) ?? 1;
        $total = $payingAmount * $qty;

        // add multiply, charges
        $subTotal = ($total * $gateway->multiply) + $gateway->charge;

        if ($gateway->min_amount > $subTotal) {
            Session::flash('min-max', __('The minimum transaction amount is ' . $gateway->min_amount));
            return redirect()->back();
        }

        if ($gateway->max_amount != -1 && $gateway->max_amount < $subTotal) {
            Session::flash('min-max', __('The maximum transaction amount is ' . $gateway->max_amount));
            return redirect()->back();
        }

        if ($gateway->is_auto == 0) {
            $request->validate([
                'manualPayment.comment' => ['required', 'string', 'max:500'],
                'manualPayment.image' => ['required', 'image', 'max:2048'], // 2MB
            ]);

            $payment_data['comment'] = $request->input('manualPayment.comment');
            $image = $this->saveFile($request, 'manualPayment.image');
            $payment_data['screenshot'] = $image;
            $payment_data['comment'] = $request->input('manualPayment.comment');
        }

        $payment_data['currency'] = $gateway->currency ?? 'USD';
        $payment_data['email'] = auth()->user()->email;
        $payment_data['name'] = auth()->user()->name;
        $payment_data['phone'] = $request->phone;
        $payment_data['billName'] = __('Event Booking');
        $payment_data['amount'] = $total;
        $payment_data['test_mode'] = $gateway->test_mode;
        $payment_data['charge'] = $gateway->charge ?? 0;
        $payment_data['pay_amount'] = number_format($subTotal, 0, '.', '');
        $payment_data['getway_id'] = $gateway->id;

        $callback['success'] = route('event-payments.update', 'success');
        $callback['fail'] = route('event-payments.update', 'failed');

        Session::put('call_back', $callback);

        if (!empty ($gateway->data)) {
            foreach (json_decode($gateway->data ?? '') ?? [] as $key => $info) {
                $payment_data[$key] = $info;
            }
            ;
        }

        return $gateway->namespace::make_payment($payment_data);
    }

    public function update($status)
    {
        abort_if(!Session::has('call_back'), 404);
        return $status == 'success' ? $this->success() : $this->failed();
    }

    private function success()
    {
        abort_if(!Session::has('payment_info'), 404);
        $paymentInfo = Session::get('payment_info');
        $seat_no = Session::get('seat_no');
        $event_id = Session::get('event_id');
        /** @var \App\Models\Event $event */
        $event = Event::findOrFail($event_id);

        foreach ($seat_no as $no) {
            $event->users()->attach(auth()->id(), ['seat_no' => $no]);
        }

        $order = new EventOrder();
        $order->event_id = $event->id;
        $order->payment_id = $paymentInfo['payment_id'];
        $order->user_id = Auth::id();
        $order->gateway_id = $paymentInfo['getway_id'];
        $order->amount = $paymentInfo['amount'];
        $order->tax = 0;
        $order->qty = count($seat_no) ?? 1;
        $order->status = $paymentInfo['status'] ?? 2;

        if (isset ($paymentInfo['meta'])) {
            $order->meta = json_encode($paymentInfo['meta']);
        }
        $order->save();

        Session::forget('payment_info');
        Session::forget('call_back');
        Session::forget('seat_no');
        Session::forget('event_id');
        Session::forget('paying_amount');

        $message = $paymentInfo['status'] == 1 ? __('Payment successfully') : __('Your payment is completed admin will review this payment manually for approval.');
        Session::flash('success', $message);

        return to_route('events.book.success', $event);
    }

    private function failed()
    {
        Session::forget('payment_info');
        Session::forget('call_back');
        Session::forget('seat_no');
        Session::forget('event_id');
        Session::forget('paying_amount');

        Session::flash('error', __('Your payment request is failed'));

        $event = Event::findOrFail(Session::get('event_id'));
        return to_route('events.show', $event);
    }
}
