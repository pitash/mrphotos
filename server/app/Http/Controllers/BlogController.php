<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Category;
use App\Models\Country;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class BlogController extends Controller
{
    public function index()
    {
        $datas = Blog::orderBy('id', 'desc')->get();
        $countries = Country::where('is_active', true)->get();
        $categories = Category::where('is_active', true)->get();
        return view('blog.index', compact('datas','countries','categories'));
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
        $imagePath = Blog::uploadImage($request->file('image'), $country->name);

        // Handle multiple gallery images
        $galleryPaths = $request->hasFile('galleries')
            ? Blog::uploadGalleries($request->file('galleries'), $country->name)
            : [];

        $data = Blog::create([
            'title' => $request->title,
            'description' => $request->description,
            'image' => $imagePath,
            'galleries' => json_encode($galleryPaths),
            'comments_count' => 0,
            'published_date' => now(),
            'country_id' => $request->country_id,
            'category_id' => $request->category_id,
            'is_active' => true,
            'is_published' => true,
        ]);

        return redirect()->route('blog.index')->with('success', 'Blog created successfully.');
    }

    public function edit($id)
    {
        $blog = Blog::findOrFail($id);

        return response()->json([
            'title' => $blog->title,
            'description' => $blog->description,
            'country_id' => $blog->country_id,
            'category_id' => $blog->category_id,
            'main_image' => $blog->image,
            'galleries' => json_decode($blog->galleries),
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'country_id' => 'required|exists:countries,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg',
            'galleries' => 'nullable|array',
            'galleries.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg',
        ]);

        $blog = Blog::findOrFail($id);
        $blog->title = $request->title;
        $blog->description = $request->description;
        $blog->country_id = $request->country_id;
        $blog->category_id = $request->category_id;

        if ($request->hasFile('image')) {
            // Delete the old image from storage if it exists
            if ($blog->image) {
                $oldImagePath = $blog->image;
                $oldImageFullPath = storage_path('app/public/' . $oldImagePath);
                if (file_exists($oldImageFullPath)) {
                    unlink($oldImageFullPath);
                }
            }

            $country = Country::findOrFail($request->country_id);
            $blog->image = Blog::uploadImage($request->file('image'), $country->name);
        }

        if ($request->hasFile('galleries')) {
            $existingGalleries = json_decode($blog->galleries, true);
            foreach ($existingGalleries as $existingGallery) {
                $oldGalleryPath = $existingGallery;
                $oldGalleryFullPath = storage_path('app/public/' . $oldGalleryPath);
                if (file_exists($oldGalleryFullPath)) {
                    unlink($oldGalleryFullPath);
                }
            }

            $country = Country::findOrFail($request->country_id);
            $galleryPaths = Blog::uploadGalleries($request->file('galleries'), $country->name);
            $blog->galleries = json_encode($galleryPaths);
        }

        $blog->save();

        return redirect()->route('blog.index')->with('success', 'Blog updated successfully');
    }


    public function toggleStatus($id)
    {
        $data = Blog::findOrFail($id);
        $data->toggleStatus();

        return redirect()->route('blog.index')->with('success', 'Blog status updated successfully.');
    }

}
