<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table = 'products';

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
        'is_hit' => 'boolean',
        'images' => 'array',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function skus()
    {
        // Связь с таблицей product_skus
        return $this->hasMany(ProductSku::class);
    }

    public function attributes()
    {
        // Связь с таблицей product_attributes
        return $this->hasMany(ProductAttribute::class);
    }
}
