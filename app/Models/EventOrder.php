<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class EventOrder extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'invoice_no',
        'payment_id',
        'event_id',
        'user_id',
        'gateway_id',
        'amount',
        'tax',
        'qty',
        'status',
        'meta',
    ];


    protected $casts = [
        'meta' => 'json'
    ];

    protected $appends = ['created_at_diff', 'amountFormat'];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            $model->id = self::max('id') + 1;
            $model->invoice_no = str_pad($model->id, 7, '0', STR_PAD_LEFT);
        });
    }
    public function getAmountFormatAttribute()
    {
        return amount_format($this->amount);
    }
    public function getCreatedAtDiffAttribute()
    {
        return $this->created_at?->diffForHumans();
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function gateway()
    {
        return $this->belongsTo('App\Models\Gateway');
    }

    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
    }
}
