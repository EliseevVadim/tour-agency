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

    public function package()
    {
        return $this->belongsTo(Package::class, 'package_id', 'id');
    }
}
