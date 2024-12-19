<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

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
        'category_id',
        'is_active',
        'is_published',
    ];

    protected $casts = [
        'published_date' => 'date',
    ];

    public function country()
    {
        return $this->belongsTo(Country::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public static function uploadImage($file, $countryName)
    {
        $countryFolder = 'images/blogs/' . Str::snake(Str::lower($countryName));
        return $file->store($countryFolder . '/slider', 'public');
    }

    public static function uploadGalleries($files, $countryName)
    {
        $countryFolder = 'images/blogs/' . Str::snake(Str::lower($countryName));
        $galleryPaths = [];

        foreach ($files as $file) {
            $galleryPaths[] = $file->store($countryFolder . '/galleries', 'public');
        }

        return $galleryPaths;
    }

    public function toggleStatus()
    {
        $this->is_active = !$this->is_active;
        $this->save();
    }
}
