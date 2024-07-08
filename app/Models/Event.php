<?php

namespace App\Models;

use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Cviebrock\EloquentSluggable\Sluggable;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Carbon;

class Event extends Model
{
    use HasFactory, Sluggable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'body',
        'preview',
        'start_at',
        'location',
        'email',
        'phone',
        'total_seat',
        'seat_prefix',
        'seat_limit',
        'is_free',
        'fee_amount',
        'is_active',
        'guests',
        'meta',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'start_at' => 'datetime',
        'guests' => 'json',
        'meta' => 'json',
        'is_active' => 'boolean',
    ];

    /**
     * Return the sluggable configuration array for this model.
     *
     * @return array
     */
    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'title'
            ]
        ];
    }

    public function scopeActive(Builder $query)
    {
        return $query->where('is_active', 1);
    }

    function getRouteKeyName()
    {
        return 'slug';
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class)->withPivot(['seat_no']);
    }

    public function orders(): HasMany
    {
        return $this->hasMany(EventOrder::class);
    }

    public function isExpired()
    {
        return now()->make($this->start_at)->isPast();
    }

    public function getAuthUserSeat($toString = false)
    {
        $values = $this->users()->wherePivot('user_id', auth()->id())->pluck('seat_no');

        if ($toString) {
            return $this->seat_prefix . collect(($values))->join(', ' . $this->seat_prefix);
        }

        return $values;
    }
    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['start_at_time'];

    /**
     * Get the start_at_time
     *
     * @param  string  $value
     * @return string
     */
    public function startAtTime(): Attribute
    {
        return Attribute::make(
            get: fn ($value, $attrs) => [
                'formatted' => Carbon::make($attrs['start_at'])->format('d M, y | h:i a'),
                'datetime' => Carbon::make($attrs['start_at'])->format('Y-m-d\TH:i'),
                'time' => Carbon::make($attrs['start_at'])->format('h:i a'),
            ],
        );
    }


    public function generateAuthUserTicket(int $userId = null)
    {
        /**
         * @var \App\Models\User $user
         */
        $user = User::find($userId ?? auth()->id());
        $evDate = now()->make($this->start_at)->format('M d, Y h:i a');
        $seats = $this->getAuthUserSeat(true);
        $order = $this->orders()->where('user_id', $user->id)->firstOrFail();
        $invoiceNo = $order?->invoice_no;
        $qrText = "
        Invoice No: $invoiceNo
        Name: $user->name
        Email: $user->email
        Event: $this->title
        Location: $this->location
        Date: $evDate
        Seats: $seats
        ";

        if (!is_dir(public_path('uploads/event-tickets'))) {
            mkdir(public_path('uploads/event-tickets'), 0777, true);
        }

        $qrImage = '/uploads/event-tickets/ticket-' . ($invoiceNo ?? time()) . '-qr.svg';
        QrCode::generate($qrText, public_path($qrImage));

        $seat_no = $this->getAuthUserSeat(true);
        $qty = count($this->getAuthUserSeat());
        $pdf = Pdf::loadView('events.ticket', [
            'user' => $user,
            'event' => $this,
            'seat_no' => $seat_no,
            'qty' => $qty,
            'invoiceNo' => $invoiceNo,
            'qrImage' => public_path($qrImage),
        ])->setPaper([0, 0, 450, 330]);

        $ticketPath = 'uploads/event-tickets/ticket-' . ($invoiceNo ?? time()) . '.pdf';

        $pdf->save(public_path($ticketPath));

        $meta = collect(json_decode($order->meta) ?? [])->merge([
            'qr_code' => $qrImage,
            'ticket' => $ticketPath,
        ])->toArray();

        $order->meta = json_encode($meta);
        $order->save();

        return $ticketPath;
    }
}
