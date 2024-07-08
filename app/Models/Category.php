<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Staudenmeir\EloquentEagerLimit\Relations\BelongsToMany;

class Category extends Model
{
    use HasFactory, Sluggable;

    protected $fillable = [
        'parent_id',
        'title',
        'slug',
        'status',
        'preview',
        'type',
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

    public function parent()
    {
        return $this->hasOne(Category::class, 'id', 'parent_id');
    }

    public function subs()
    {
        return $this->hasMany(Category::class, 'parent_id', 'id');
    }

    public function childrenCategories()
    {
        return $this->hasMany(Category::class, 'parent_id', 'id')->with('subs');
    }

    // blogs
    public function postCategories()
    {
        return $this->hasMany(Category::class, 'parent_id')->where('type', 'categories');
    }

    public function blogPosts()
    {
        return $this->BelongsToMany(Post::class, 'postcategories');
    }

    public function projects()
    {
        return $this->hasMany(Project::class);
    }


    // meta functionalities
    //=> relations

    public function metas(): HasMany
    {
        return $this->hasMany(CategoryMeta::class);
    }

    public function meta(): HasOne
    {
        return $this->hasOne(CategoryMeta::class);
    }


    //=> scopes
    public function scopeActive(Builder $query)
    {
        return $query->where('status', 1);
    }
    public function scopeBlogs(Builder $query)
    {
        return $query->where('type', 'blog_category');
    }
    public function scopeTags(Builder $query)
    {
        return $query->where('type', 'tags');
    }
    public function scopeProject(Builder $query)
    {
        return $query->where('type', 'project');
    }

    //=> helper methods
    public function getMeta($key): CategoryMeta
    {
        return $this->metas()->where('key', $key)->first();
    }

    public function addMeta($key, $value): CategoryMeta
    {
        return $this->metas()->create(compact('key', 'value'));
    }

    public function updateMeta($key, $value): bool
    {
        return  $this->meta()->update(compact('key', 'value'));
    }

    public function deleteMeta($key): bool
    {
        return $this->metas()->where('key', $key)->delete();
    }
}
