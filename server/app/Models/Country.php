<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    protected $fillable = [
        'name',
        'is_active',
    ];

    public function galleries()
    {
        return $this->hasMany(Gallery::class);
    }
}
