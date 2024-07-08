<?php

namespace App\Mail;

use App\Models\Event;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class EventBookingConfirmationEmail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(
        public Event $event
    ) {
        //
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Crop Connect Event Booking Confirmation',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        $seat_no = $this->event->getAuthUserSeat(true);
        $qty = count($this->event->getAuthUserSeat());
        $order = $this->event->orders()->where('user_id', auth()->id())->firstOrFail();
        $invoiceNo = $order?->invoice_no;
        $qrImage = json_decode($order?->meta)?->qr_code ?? '';

        return new Content(
            view: 'events.ticket',
            with: [
                'user' => auth()->user(),
                'seat_no' => $seat_no,
                'qty' => $qty,
                'invoiceNo' => $invoiceNo,
                'qrImage' => public_path($qrImage),
                'event' => $this->event,
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
