<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Hotel extends Model
{
    protected $fillable = [
        'name',
        'country',
        'stars',
        'description',
        'image_path',
        'link',
        'socials',
        'is_active',
    ];

    protected $casts = [
        'stars' => 'integer',
        'socials' => 'array',
        'is_active' => 'boolean',
    ];

    protected $appends = [
        'image_url',
    ];

    public function getImageUrlAttribute(): ?string
    {
        if (!$this->image_path) {
            return null;
        }

        return "/storage/{$this->image_path}";
    }
}
