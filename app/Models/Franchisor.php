<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Franchisor extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'city',
        'phone',
        'description',
        'image_path',
        'link',
        'is_active',
    ];

    protected $casts = [
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
