<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PromoCodeRule extends Model
{
    use HasFactory;

    protected $fillable = [
        'package_id',
        'discount_type',
        'discount_value',
        'valid_days',
        'quantity_to_generate',
    ];

    protected $casts = [
        'discount_value' => 'integer',
        'valid_days' => 'integer',
        'quantity_to_generate' => 'integer',
    ];

    public function package()
    {
        return $this->belongsTo(Package::class, 'package_id', 'id');
    }

    public function codes()
    {
        return $this->hasMany(PromoCode::class);
    }
}
