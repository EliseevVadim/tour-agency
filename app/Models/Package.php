<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Package extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'name',
        'price_old',
        'price_new',
        'content_link',
    ];

    protected $casts = [
        'price_old' => 'integer',
        'price_new' => 'integer',
    ];
}
