<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {

        $this->call([
            HomePageSeeder::class,
            CountrySeeder::class,
            GallerySeeder::class,
            AboutSeeder::class,
        ]);
    }
}
