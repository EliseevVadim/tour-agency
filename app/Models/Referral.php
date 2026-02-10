<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Referral extends Model
{
    use HasFactory;

    protected $fillable = [
        'full_name',
        'phone',
        'email',
        'tg_username',
        'ref_code',
    ];

    public function transactions(): HasMany
    {
        return $this->hasMany(PaymentTransaction::class, 'ref_id');
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($referral) {
            if (empty($referral->ref_code)) {
                $referral->ref_code = static::generateUniqueRefCode();
            }
        });
    }

    protected static function generateUniqueRefCode(): string
    {
        do {
            $code = Str::random(10);
        } while (self::where('ref_code', $code)->exists());

        return strtoupper($code);
    }
}
