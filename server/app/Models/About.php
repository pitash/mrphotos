<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class About extends Model
{
    protected $fillable = [
        'name',
        'description',
        'quot1_title',
        'quot1_desc',
        'quot2_title',
        'quot2_desc',
        'quot3_title',
        'quot3_desc',
        'is_active',
    ];
}
