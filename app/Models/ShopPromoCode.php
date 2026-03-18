<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class ShopPromoCode extends Model
{
    protected $fillable = [
        'code',
        'discount_percent',
        'max_usages',
        'usages_count',
        'is_active',
    ];

    protected $casts = [
        'discount_percent' => 'integer',
        'max_usages' => 'integer',
        'usages_count' => 'integer',
        'is_active' => 'boolean',
    ];

    protected $appends = [
        'remaining_usages',
        'is_limit_reached',
        'status',
    ];

    public function getRemainingUsagesAttribute()
    {
        if ((int) $this->max_usages === 0) {
            return null;
        }

        return max((int) $this->max_usages - (int) $this->usages_count, 0);
    }

    public function getIsLimitReachedAttribute(): bool
    {
        if ((int) $this->max_usages === 0) {
            return false;
        }

        return (int) $this->usages_count >= (int) $this->max_usages;
    }

    public function scopeStatus(Builder $query, ?string $status): Builder
    {
        if ($status === 'active') {
            return $query->where(function (Builder $q) {
                $q->where('max_usages', 0)
                    ->orWhereColumn('usages_count', '<', 'max_usages');
            });
        }

        if ($status === 'non_active') {
            return $query->where('is_active', false);
        }

        if ($status === 'limit_reached') {
            return $query->where('max_usages', '>', 0)
                ->whereColumn('usages_count', '>=', 'max_usages');
        }

        return $query;
    }

    public function getStatusAttribute(): string
    {
        if (!$this->is_active) {
            return 'disabled';
        }

        return $this->is_limit_reached ? 'limit_reached' : 'active';
    }

    public function canBeUsed(): bool
    {
        if (!$this->is_active) {
            return false;
        }

        if ((int) $this->max_usages === 0) {
            return true;
        }

        return (int) $this->usages_count < (int) $this->max_usages;
    }
}
