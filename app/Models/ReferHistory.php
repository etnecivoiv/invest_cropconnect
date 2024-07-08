<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReferHistory extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['refer_user_id', 'referral_user_id'];

    public function referUser()
    {
        return $this->belongsTo(User::class, 'refer_user_id');
    }

    public function referralUser()
    {
        return $this->belongsTo(User::class, 'referral_user_id');
    }
}
