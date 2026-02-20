<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductAttributeOption extends Model
{
    use HasFactory;

    protected $table = 'product_attribute_options';

    protected $fillable = [
        'attribute_id',
        'value',
    ];

    public function attribute()
    {
        return $this->belongsTo(ProductAttribute::class, 'attribute_id');
    }

    public function skus()
    {
        return $this->belongsToMany(
            ProductSku::class,
            'sku_option_pivot',
            'option_id',
            'sku'
        );
    }
}
