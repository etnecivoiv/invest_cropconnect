<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ReturnSchedule extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'project_id',
        'project_duration_id',
        'return_type',
        'profit_type',
        'amount',
        'attachment',
        'return_date',
        'status',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'return_date' => 'date',
    ];

    public function project_duration(): BelongsTo
    {
        return $this->belongsTo(ProjectDuration::class);
    }
}
