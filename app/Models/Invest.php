<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Invest extends Model
{
    use HasFactory;
    protected $guarded = [];

    protected $fillable = [

        'invoice_no',
        'project_duration_id',
        'project_id',
        'order_id',
        'user_id',
        'qty',
        'amount',
        'tax_amount',
        'status',
        'next_payment_date',
        'meta',
    ];  // ito po yung nabago

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            $model->id = Invest::max('id') + 1;
            $model->invoice_no = str_pad($model->id, 7, '0', STR_PAD_LEFT);
        });
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    public function project_duration(): BelongsTo
    {
        return $this->belongsTo(ProjectDuration::class);
    }
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
