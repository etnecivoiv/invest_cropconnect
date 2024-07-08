<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>{{ __('Event Ticket') }}</title>

   
</head>

<body>

    <main>
        <img class="qr" src="{{ $qrImage }}" alt="">
        <div class="text-center">
            <h2 class="title">{{ Str::upper(__('Event Entry Ticket')) }}</h2>
            <br>
            <h3>{{ __('Event') }}: {{ $event->title }}</h3>
            <p>{{ __('Location') }}: {{ $event->location }}</p>
            <p>{{ __('Date') }}: {{ now()->make($event->start_at)->format('M d, Y h:i a') }}</p>
        </div>
        <br>

        <table class="table">
            <tr>
                <th class="text-end">{{ __('Invoice No.') }}</th>
                <td>:</td>
                <td class="text-start">{{ $invoiceNo }}</td>
            </tr>

            <tr>
                <th class="text-end">{{ __('Name') }}</th>
                <td>:</td>
                <td class="text-start">{{ $user->name }}</td>
            </tr>
            <tr>
                <th class="text-end">{{ __('Email') }}</th>
                <td>:</td>
                <td class="text-start">{{ $user->email }}</td>
            </tr>
            <tr>
                <th class="text-end">{{ __('Seat Booked') }}</th>
                <td>:</td>
                <td class="text-start">{{ $seat_no }}</td>
            </tr>
            @php
                $currency = get_option('base_currency', true)?->icon ?? '$';
            @endphp
            <tr>
                <th class="text-end">{{ __('Per Seat Fee') }}</th>
                <td>:</td>
                <td class="text-start">
                    {{ $event->is_free ? 'Free' : $currency . number_format($event->fee_amount, 2) }}</td>
            </tr>
            <tr>
                <th class="text-end">{{ __('Total Fee') }}</th>
                <td>:</td>
                <td class="text-start">
                    {{ $event->is_free ? 'Free' : $currency . number_format($event->fee_amount * $qty, 2) }}</td>
            </tr>

        </table>

        <p class="thanks">{{ __('Thanks For Participants With Us.') }}</p>
    </main>
</body>

</html>
