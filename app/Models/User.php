<?php

namespace App\Models;

use App\Models\KycMethod;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    protected static function boot()
    {
        parent::boot();
        // assign the username
        static::creating(function ($user) {
            $isNameUnique = User::where('name', $user->name)->count();
            $username = Str::of($user->name)
                ->trim()
                ->lower()
                ->replace(' ', '')
                ->append($isNameUnique > 0 ? $isNameUnique . Str::random(2) : '');

            $user->username = Str::slug($username);
        });
    }

    protected $fillable = [
        'name',
        'username',
        'email',
        'phone',
        'address',
        'avatar',
        'wallet',
        'password',
        'role',
        'meta',
        'uplink_id',
        'provider_id',
        'provider',
        'kyc_verified_at',
        'email_verified_at',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'kyc_verified_at' => 'datetime',
        'meta' => 'json',
    ];

    protected $appends = ['created_at_date'];

    public function getCreatedAtDateAttribute()
    {
        return $this->created_at?->format('d F Y');
    }

    public static function getpermissionGroups()
    {
        $permission_groups = DB::table('permissions')
            ->select('group_name as name')
            ->groupBy('group_name')
            ->get();
        return $permission_groups;
    }

    public static function getPermissionGroup()
    {
        return $permission_groups = DB::table('permissions')->select('group_name')->groupBy('group_name')->get();
    }
    public static function getpermissionsByGroupName($group_name)
    {
        $permissions = DB::table('permissions')
            ->select('name', 'id')
            ->where('group_name', $group_name)
            ->get();
        return $permissions;
    }

    public static function roleHasPermissions($role, $permissions)
    {
        $hasPermission = true;
        foreach ($permissions as $permission) {
            if (!$role->hasPermissionTo($permission->name)) {
                $hasPermission = false;
                return $hasPermission;
            }
        }
        return $hasPermission;
    }

    public function kycMethods(): BelongsToMany
    {
        return $this->belongsToMany(KycMethod::class)->withPivot('kyc_request_id');
    }

    public function walletTransactions(): HasMany
    {
        return $this->hasMany(WalletTransaction::class);
    }

    public function return_transactions(): HasMany
    {
        return $this->hasMany(ReturnTransaction::class);
    }

    public function events(): BelongsToMany
    {
        return $this->belongsToMany(Event::class);
    }

    public function eventOrders(): HasMany
    {
        return $this->hasMany(EventOrder::class);
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }


    //scopes
    public function scopeAdmins($query): Builder // Admins list
    {
        return $query->where('role', 'admin');
    }

    public function scopeActive($query): Builder
    {
        return $query->where('status', 1);
    }

    public function scopeInActive($query): Builder
    {
        return $query->where('status', '!=', 1);
    }

    public function scopeKycVerified($query): Builder
    {
        return $query->where('kyc_verified_at', '!=', null);
    }

    // helper methods
    public function isAdmin(): bool
    {
        return $this->role == 'admin';
    }

    public function getDashboardRoute(): string // route name
    {
        return match ($this->role) {
            'admin' => 'admin.dashboard',
            'user' => 'user.dashboard',
            'employer' => 'employer.dashboard',
            default => 'home',
        };
    }

    public function getReferLink(): string
    {
        return route('home', ['ref' => $this->id]);
    }


    /**
     * Formate date for this model datetime attributes
     */
    public function formattedDateFor($attr = 'created_at', $format = 'd M, Y h:i a'): string
    {
        return $this->$attr ? now()->make($this->$attr)->format($format) : '';
    }

    public function notificationMessages()
    {
        return $this->hasMany(Notification::class)->where('is_admin', 0);
    }

    public function uplink(): BelongsTo
    {
        return $this->belongsTo(self::class, 'uplink_id', 'id');
    }
}
