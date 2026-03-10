<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'number',
        'customer_name',
        'customer_phone',
        'customer_email',
        'delivery_mode',
        'city',
        'city_code',
        'street',
        'house',
        'flat',
        'entrance',
        'floor',
        'pickup_point_code',
        'pickup_point_address',
        'tariff_code',
        'delivery_price',
        'items_price',
        'total_price',
        'package_weight',
        'package_length',
        'package_width',
        'package_height',
        'status',
        'delivery_status',
        'cdek_uuid',
        'cdek_number',
        'items',
        'delivery_meta',
    ];

    protected $casts = [
        'items' => 'array',
        'delivery_meta' => 'array',
        'delivery_price' => 'decimal:2',
        'items_price' => 'decimal:2',
        'total_price' => 'decimal:2',
    ];
}
