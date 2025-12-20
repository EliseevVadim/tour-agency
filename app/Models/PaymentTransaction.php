<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentTransaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'package_id',
        'promo_code_id',
        'payment_id',
        'status',
        'payment_method',
        'amount',
        'payment_at',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'payment_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function package()
    {
        return $this->belongsTo(Package::class, 'package_id', 'id');
    }

    public function promoCodes()
    {
        return $this->belongsTo(PromoCode::class, 'promo_code_id', 'id');
    }
}
