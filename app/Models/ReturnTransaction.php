<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ReturnTransaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_duration_id',
        'return_schedule_id',
        'user_id',
        'amount',
        'status',
        'type',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function project_duration(): BelongsTo
    {
        return $this->belongsTo(ProjectDuration::class);
    }
    public function return_schedule(): BelongsTo
    {
        return $this->belongsTo(ReturnSchedule::class);
    }
}
