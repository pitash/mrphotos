<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Contact;

class ContactSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Contact::create([
            'address' => 'Paragon House 5, C/A Bir Uttam AK Khandakar Rd, Mohakhali Dhaka 1212, Bangladesh',
            'phone' => '+88 02 9882107-8',
            'email' => 'info@paragongroup-bd.com',
            'map_address' => '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.040183242764!2d90.39815787533689!3d23.781583378649096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c76c37aa2ca9%3A0x2f9ff94e01d6d2bf!2sParagon%20Group!5e0!3m2!1sen!2sbd!4v1733977283510!5m2!1sen!2sbd" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
