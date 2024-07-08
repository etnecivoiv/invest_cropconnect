<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gateway extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
        'name',
        'currency',
        'logo',
        'charge',
        'multiply',
        'namespace',
        'min_amount',
        'max_amount',
        'is_auto',
        'image_accept',
        'test_mode',
        'status',
        'phone_required',
        'data',
        'comment'
    ];
}
