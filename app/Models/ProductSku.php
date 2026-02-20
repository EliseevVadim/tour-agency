<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductSku extends Model
{
    use HasFactory;

    protected $table = 'product_skus';

    protected $primaryKey = 'sku';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'sku',
        'product_id',
        'price',
        'stock_qty',
    ];

    protected $casts = [
        'stock_qty' => 'integer',
        'price' => 'integer',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function options()
    {
        return $this->belongsToMany(
            ProductAttributeOption::class,
            'sku_option_pivot',
            'sku',
            'option_id'
        );
    }
}
