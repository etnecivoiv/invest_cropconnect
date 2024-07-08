<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Event;
use App\Models\Gateway;
use App\Models\EventOrder;
use App\Models\Notification;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Session;
use App\Mail\EventBookingConfirmationEmail;
use App\Models\User;
use App\Services\SeoMeta;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        SeoMeta::init('seo_event');

        $events = Event::active()
            ->when(request('order_by') == 'new', function ($q) {
                return $q->latest();
            })
            ->paginate();

        return Inertia::render('Web/Events/Index', [
            'events' => $events,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Event $event)
    {

        $authBookings = [];
        if (auth()->check()) {
            /**
             * @var \App\Models\User
             */
            $user = auth()->user();
            $authBookings = DB::table('event_user')
                ->where('event_id', $event->id)
                ->where('user_id', auth()->id())
                ->pluck('seat_no')->map(function ($item) {
                    return intval($item);
                });
        }

        $isBooked = boolval(count($authBookings));

        $bookings = DB::table('event_user')
            ->where('event_id', $event->id)
            ->pluck('seat_no')->map(function ($item) {
                return intval($item);
            });

        $status = $event->orders()->where('user_id', auth()->id())->first()?->status ?? null;

        return Inertia::render('Web/Events/Book', compact('event', 'bookings', 'authBookings', 'isBooked', 'status'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Event $event)
    {
        $isBooked = false;
        if (auth()->check()) {
            /**
             * @var \App\Models\User
             */

            $user = auth()->user();
            $isBooked = boolval($user->eventOrders()->find($event->id));
        }

        $seo = ($event->seo ?? [
            'title' => $event->title,
            'preview' => asset($event->preview),
        ]);

        SeoMeta::set($seo);

        return Inertia::render('Web/Events/Show', [
            'event' => $event,
            'isBooked' => $isBooked,
            'isExpired' => $event->isExpired(),

        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Event $event)
    {
        // maximum booked
        if ($event->users()->count() >= $event->total_seat) {
            Session::flash('error', __('Maximum limit exists'));
            return to_route('events.show', $event);
        }

        // if not logged in
        if (!auth()->check()) {
            return to_route('login');
        }

        /**
         * @var \App\Models\User
         */
        $user = auth()->user();
        if ($user->events()->find($event->id)) {
            return to_route('events.show', $event);
        }
        ;


        if (!$event->is_free) {
            return $this->makePayment($event->fee_amount, $event->id, $request->seat_no);
        } else {
            $request->collect('selected_seats')->each(function ($seatNo) use ($user, $event) {
                $user->events()->attach($event, ['seat_no' => $seatNo]);

                $order = new EventOrder();
                $order->event_id = $event->id;
                $order->payment_id = null;
                $order->user_id = Auth::id();
                $order->gateway_id = null;
                $order->amount = 0;
                $order->tax = 0;
                $order->qty = count(request('selected_seats', [1])) ?? 1;
                $order->status = 1;
                $order->save();
            });
        }

        Notification::create([
            'user_id' => auth()->id(),
            'title' => __('New Event Booking'),
            'comment' => __('An User has booked a seat'),
            'to_admin' => 1
        ]);

        return to_route('events.book.success', $event);
    }

    public function bookSuccess(Event $event)
    {

        $event->generateAuthUserTicket();
        $seat_no = $event->getAuthUserSeat();

        try {
            if (env('QUEUE_MAIL')) {
                Mail::to(request()->user())->queue(new EventBookingConfirmationEmail($event, $seat_no));
            } else {
                Mail::to(request()->user())->send(new EventBookingConfirmationEmail($event, $seat_no));
            }
        } catch (\Throwable $th) {
            //throw $th;
        }

        return Inertia::render('Web/Events/BookSuccess', [
            'event' => $event,
            'seat_no' => $seat_no,
            'status' => $event->orders()->where('user_id', auth()->id())->first()?->status,
        ]);
    }

    public function ticket(Event $event)
    {

        /**
         * @var \App\Models\User
         */
        $user = auth()->user();

        $order = $event->orders()->where('user_id', $user->id)->firstOrFail();
        if ($order->status !== 1) {
            return back();
        }

        $meta = (array) json_decode($order->meta);
        if (isset($meta['qr_code']) && is_file(public_path($meta['qr_code']))) {
            $ticket = $meta['ticket'];
        } else {
            $ticket = $event->generateAuthUserTicket();
        }

        return response()->download(public_path($ticket));
    }

    private function makePayment($amount, $event_id, $seatNo)
    {
        Session::forget('payment_info');
        Session::forget('call_back');
        Session::forget('seat_no');
        Session::forget('event_id');
        Session::forget('paying_amount');

        Session::put('paying_amount', $amount);
        Session::put('event_id', $event_id);
        Session::put('seat_no', $seatNo);

        return Inertia::location(route('event-payments.index'));
    }
}
