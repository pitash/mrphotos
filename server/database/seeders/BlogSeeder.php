<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Country;
use App\Models\Blog;
use Illuminate\Support\Facades\File;

class BlogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */

     public function run(): void
    {
        $countries = Country::all();
        $categories = Category::all();

        foreach ($countries as $country) {
            // Define country-specific image folders
            $baseFolder = 'images/blogs/' . strtolower(str_replace(' ', '_', $country->name));
            $sliderFolder = $baseFolder . '/slider';
            $galleriesFolder = $baseFolder . '/galleries';

            // Create the folders
            if (!File::exists(public_path($sliderFolder))) {
                File::makeDirectory(public_path($sliderFolder), 0777, true);
            }

            if (!File::exists(public_path($galleriesFolder))) {
                File::makeDirectory(public_path($galleriesFolder), 0777, true);
            }

            $category = $categories->random();

            Blog::create([
                'title' => 'Blog of Nature in ' . $country->name,
                'description' => 'Explore the beauty of nature in ' . $country->name,
                'image' => $sliderFolder . '/slider_image1.jpg',
                'galleries' => json_encode([
                    $galleriesFolder . '/gallery_image11.jpg',
                    $galleriesFolder . '/gallery_image22.jpg',
                ]),
                'comments_count' => 0,
                'published_date' => now(),
                'country_id' => $country->id,
                'category_id' => $category->id,
                'is_active' => true,
                'is_published' => true,
            ]);
        }
    }




}
