<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Project extends Model
{
    use HasFactory, Sluggable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'category_id',
        'slug',
        'preview',
        'cover_image',
        'address',
        'total_units',
        'invest_amount',
        'expire_date',
        'status',
        'accept_new_investor',
        'meta',
        'faqs',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'accept_new_investor' => 'boolean',
        'status' => 'boolean',
        'meta' => 'json',
        'faqs' => 'json',
    ];

    const STATUS = ['ACTIVE' => 1];

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

    public function category()
    {
        return $this->belongsTo(Category::class)->where('type', 'project');
    }

    public function durations(): HasMany
    {
        return $this->hasMany(ProjectDuration::class);
    }

    public function returnSchedules(): HasMany
    {
        return $this->hasMany(ReturnSchedule::class);
    }

    //=> scopes
    public function scopeActive(Builder $query)
    {
        return $query->where('status', 1);
    }



    // meta functionalities
    //=> relations

    public function metas(): HasMany
    {
        return $this->hasMany(ProjectMeta::class);
    }

    public function meta(): HasOne
    {
        return $this->hasOne(ProjectMeta::class);
    }

    //=> helper methods
    public function getMeta($key): ProjectMeta|null
    {
        return $this->metas()->where('key', $key)->first();
    }

    public function addMeta($key, $value): ProjectMeta
    {
        return $this->metas()->create(compact('key', 'value'));
    }

    public function addMetas(array $items): void
    {
        foreach ($items as $key => $value) {
            $this->addMeta($key, $value);
        }
    }

    public function updateMeta($key, $value): bool
    {
        return  $this->meta()->update(compact('key', 'value'));
    }

    public function deleteMeta($key): bool
    {
        return $this->metas()->where('key', $key)->delete();
    }

    // durations
    //=> actions methods
    public function addDurations(array $items = []): void
    {
        foreach ($items as $item) {
            $this->durations()->updateOrCreate(
                [
                    'id' => isset($item['id']) ? $item['id'] : 0
                ],
                $item
            );
        }
    }

    public function invests(): HasMany
    {
        return $this->hasMany(Invest::class);
    }
    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }


    public function nextPaymentDate()
    {
        return $this->returnSchedules()->whereDate('return_date', '>=', today())
            ->latest()
            ->value('return_date');
    }
}
