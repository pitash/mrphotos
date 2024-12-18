<?php

namespace Database\Seeders;

use App\Models\Gallery;
use App\Models\Country;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class GallerySeeder extends Seeder
{
    public function run(): void
    {
        $countries = Country::all();

        foreach ($countries as $country) {
            // Define country-specific image folder
            $countryFolder = 'images/galleries/' . strtolower(str_replace(' ', '_', $country->name)); // Country folder name (lowercase, spaces replaced with underscores)

            // Create the country folder if it doesn't exist
            if (!File::exists(public_path($countryFolder))) {
                File::makeDirectory(public_path($countryFolder), 0777, true);
            }

            Gallery::create([
                'title' => 'Gallery of Nature in ' . $country->name,
                'description' => 'Explore the beauty of nature in ' . $country->name,
                'image_path' => $countryFolder . '/nature11.jpg',
                'country_id' => $country->id,
                'is_active' => true,
            ]);

        }
    }
}
