<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CountrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $countries = [
            ['name' => 'United States', 'is_active' => true],
            ['name' => 'Norway', 'is_active' => true],
            // ['name' => 'Germany', 'is_active' => true],
        ];

        foreach ($countries as $country) {
            DB::table('countries')->insert([
                'name' => $country['name'],
                'is_active' => $country['is_active'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

}
