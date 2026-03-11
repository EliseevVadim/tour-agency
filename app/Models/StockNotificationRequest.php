<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StockNotificationRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'sku',
        'product_name',
        'phone',
        'email',
        'attributes',
        'attribute_names',
        'is_notified',
        'notified_at',
    ];

    protected $casts = [
        'attributes' => 'array',
        'attribute_names' => 'array',
        'is_notified' => 'boolean',
        'notified_at' => 'datetime',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
