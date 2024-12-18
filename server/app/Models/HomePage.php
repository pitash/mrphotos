<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HomePage extends Model
{
    protected $fillable = [
        'tag',
        'heading',
        'image_path',
        'is_active',
    ];


    public function toggleStatus()
    {
        $this->is_active = !$this->is_active;
        $this->save();
    }
}
