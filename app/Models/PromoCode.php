<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class PromoCode extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'promo_code_rule_id',
        'is_used',
        'user_id',
        'expires_at',
        'used_at',
    ];

    protected $casts = [
        'is_used' => 'boolean',
        'expires_at' => 'datetime',
        'used_at' => 'datetime',
    ];

    public function rule()
    {
        return $this->belongsTo(PromoCodeRule::class, 'promo_code_rule_id');
    }

    public function user()
    {
        return $this->belongsTo(\App\Models\User::class);
    }

    public function scopeStatus(Builder $query, string $status): Builder
    {
        switch ($status) {
            case 'allowed':
                return $query->where('is_used', false)->where('expires_at', '>', now());

            case 'used':
                return $query->where('is_used', true);

            case 'expired':
                return $query->where('expires_at', '<=', now());

            default:
                return $query;
        }
    }
}
