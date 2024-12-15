<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    protected $fillable = [
        'title',
        'description',
        'image',
        'galleries',
        'comments_count',
        'published_date',
        'country_id',
        'is_active',
        'is_published',
    ];
}
