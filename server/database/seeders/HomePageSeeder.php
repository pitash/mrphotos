<?php

namespace Database\Seeders;

use App\Models\HomePage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class HomePageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        HomePage::create([
            'tag' => 'Travelling',
            'heading' => 'Incredible Iceland',
            'image_path' => 'images/slider/1.jpg',
            'is_active' => true,
        ]);

        HomePage::create([
            'tag' => 'Adventure',
            'heading' => 'Discover the Amazon Rainforest',
            'image_path' => 'images/slider/2.jpg',
            'is_active' => true,
        ]);

        HomePage::create([
            'tag' => 'Culture',
            'heading' => 'Ancient Wonders of Egypt',
            'image_path' => 'images/slider/3.jpg',
            'is_active' => true,
        ]);

    }
}
