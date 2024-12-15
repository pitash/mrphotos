<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Country;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class BlogController extends Controller
{
    public function index()
    {

    }

    public function create()
    {
        $countries = Country::where('is_active', true)->get();
        return view('blog.create', compact('countries'));
    }

    public function store(Request $request)
    {
        // print_r($request->all());

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg',
            'galleries' => 'nullable|array',
            'galleries.*' => 'image|mimes:jpeg,png,jpg,gif,svg',
            'country_id' => 'required',
        ]);

        $country = Country::findOrFail($request->country_id);
        $countryFolder = 'images/blogs/' . Str::snake(Str::lower($country->name));

        $imagePath = $request->file('image')->store($countryFolder . '/slider', 'public');

        // Handle multiple gallery images
        $galleryPaths = [];
        if ($request->hasFile('galleries')) {
            foreach ($request->file('galleries') as $file) {
                $galleryPaths[] = $file->store($countryFolder . '/galleries', 'public');
            }
        }

        $data = Blog::create([
            'title' => $request->title,
            'description' => $request->description,
            'image' => $imagePath,
            'galleries' => json_encode($galleryPaths),
            'comments_count' => 0,
            'published_date' => now(),
            'country_id' => $request->country_id,
            'is_active' => true,
            'is_published' => true,
        ]);

        return redirect()->route('blog.index')->with('success', 'Blog created successfully.');
    }

}
