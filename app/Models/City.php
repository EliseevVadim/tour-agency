<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    use HasFactory;

    protected $fillable = [
        'city_name',
        'region',
        'code',
        'uuid',
        'fias_guid',
        'latitude',
        'longitude',
        'payment_limit'
    ];

    public $timestamps = false;

    protected $casts = [
        'latitude' => 'float',
        'longitude' => 'float',
    ];
}
