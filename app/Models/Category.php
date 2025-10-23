<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Product;

class Category extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'parent_id',
        'name',
        'slug',
        'description',
    ];

    //Relasi ke parent category
    public function parent(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    //Relasi ke child category
    public function children(): HasMany
    {
        return $this->hasMany(Category::class, 'parent_id');
    }

    //Relasi ke products
    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }

    //Helper untuk cek apakah parent category
    public function isParent(): bool
    {
        return $this->children()->exist();
    }
}
