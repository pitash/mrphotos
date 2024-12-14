<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Gallery extends Model
{
    protected $fillable = [
        'title',
        'description',
        'country_id',
        'image_path',
        'is_active',
    ];

    public function country()
    {
        return $this->belongsTo(Country::class);
    }
}
