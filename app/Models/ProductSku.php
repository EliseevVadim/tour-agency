<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductSku extends Model
{
    use HasFactory;

    protected $fillable = [
        'sku',
        'product_id',
        'price',
        'stock_qty',

        'weight',
        'length',
        'width',
        'height'
    ];

    protected $casts = [
        'price' => 'integer',
        'stock_qty' => 'integer',
        'weight' => 'integer',
        'length' => 'integer',
        'width' => 'integer',
        'height' => 'integer'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function options()
    {
        return $this->belongsToMany(
            ProductAttributeOption::class,
            'product_sku_option',
            'product_sku_id',
            'option_id'
        );
    }
}
