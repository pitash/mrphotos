<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\About;

class AboutSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        About::create([
            'name' => 'Moshiur Rahman',
            'description' => 'Photography is more than my passion - it\'s my way of breathing in the world around me. Each time I raise the camera to my eye, time seems to slow, and I find myself in perfect harmony with the moment. The gentle click of the shutter becomes a meditation, a pause in time where everything aligns. To nurture this lifelong devotion, I constantly seek new perspectives and draw inspiration from the ever-changing canvas of life. I find endless fascination in the delicate dance between light and shadow, the subtle interplay of colors that paint our world, and the intricate relationships between form and space. My greatest joy comes from transforming fleeting moments into timeless narratives - whether it\'s capturing the soft golden light of dawn breaking over a landscape, freezing the subtle expressions that tell human stories, or finding beauty in the geometric patterns of urban architecture. Through my lens, I strive to infuse static images with dynamic energy, turning brief instances into eternal memories that speak to the heart of human experience.',
            'image_path' => 'images/about/About.jpg',
            'quot1_title' => 'IMAGINE A STORY',
            'quot1_desc' => 'Photography is a fantastic storytelling medium. Whether you\'re telling a story with one image, a sequence, a series, or an entire portfolio, the possibilities are endless. Just ask yourself what story you want to tell, and photography can get you there. Mastering the art of visual storytelling can transform simple snapshots into impactful narratives.',
            'quot2_title' => 'SEIZE THE MOMENT',
            'quot2_desc' => 'With a photo you can capture a moment, and have it forever. I think we take that idea for granted, with photography being so ubiquitous these days. But seriously just take a second to appreciate that. If you did that in Ancient Greece they\'d call you a sorcerer. Or a god. It is a testament to the impact a photo can attain.',
            'quot3_title' => 'SEE THE BEAUTY',
            'quot3_desc' => 'Once you start noticing nature\'s details, you inevitably start to see how much beauty is all around you. Every day is filled with it—in the most ordinary or unexpected places. When you start to derive happiness from seeing some particularly awesome light, you\'ll realize that photography has changed your everyday experience.',
            'is_active' => true,
        ]);
    }
}
