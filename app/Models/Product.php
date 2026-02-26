<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'images',
        'old_price',
        'current_price',
        'is_hit',
        'category_id',
    ];

    protected $casts = [
        'images' => 'array',
        'is_hit' => 'boolean',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function attributes()
    {
        return $this->hasMany(ProductAttribute::class);
    }

    public function skus()
    {
        return $this->hasMany(ProductSku::class);
    }
}
