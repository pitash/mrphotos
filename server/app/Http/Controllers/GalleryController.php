<?php

namespace App\Http\Controllers;

use App\Models\Country;
use App\Models\Gallery;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class GalleryController extends Controller
{
    public function index()
    {
        $countries = Country::where('is_active', true)->get();
        $datas = Gallery::orderBy('id', 'desc')->get();
        return view('gallery.index', compact('datas','countries'));
    }
    public function create()
    {
        $countries = Country::where('is_active', true)->get();
        return view('gallery.create', compact('countries'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'image' => 'required|array',
            'image.*' => 'image|mimes:jpeg,png,jpg,gif,svg',
            'country_id' => 'required',
        ]);

        $country = Country::findOrFail($request->country_id);

        $countryFolder = 'images/galleries/' . Str::snake(Str::lower($country->name));
        if (!Storage::disk('public')->exists($countryFolder)) {
            Storage::disk('public')->makeDirectory($countryFolder);
        }

        // $imagePaths = [];

        // foreach ($request->file('image') as $image) {
        //     $imagePath = $image->store($countryFolder, 'public');
        //     $imagePaths[] = $imagePath;  // Add the path to the array
        // }

        // $data = Gallery::create([
        //     'title' => $request->title,
        //     'description' => $request->description,
        //     'image_path' => json_encode($imagePaths),
        //     'country_id' => $request->country_id,
        //     'is_active' => true,
        // ]);

        foreach ($request->file('image') as $image) {
            $imagePath = $image->store($countryFolder, 'public');

            Gallery::create([
                'title' => $request->title,
                'description' => $request->description,
                'image_path' => $imagePath,
                'country_id' => $request->country_id,
                'is_active' => true,
            ]);
        }

        return redirect()->route('gallery.index')->with('success', 'Gallery created successfully.');

        // $request->validate([
        //     'title' => 'required|string|max:255',
        //     'description' => 'required|string|max:255',
        //     'image' => 'required|array',
        //     'image.*' => 'image|mimes:jpeg,png,jpg,gif,svg',
        //     'country_id' => 'required|exists:countries,id',
        // ]);

        // $country = Country::findOrFail($request->country_id);
        // $countryFolder = 'images/galleries/' . Str::snake(Str::lower($country->name));

        // if (!Storage::disk('public')->exists($countryFolder)) {
        //     Storage::disk('public')->makeDirectory($countryFolder);
        // }

        // $images = $request->file('image');

        // foreach ($images as $image) {
        //     $imagePath = $image->store($countryFolder, 'public');
        //     Gallery::create([
        //         'title' => $request->title,
        //         'description' => $request->description,
        //         'image_path' => $imagePath,
        //         'country_id' => $request->country_id,
        //         'is_active' => true,
        //     ]);
        // }


        // return redirect()->route('gallery.index')->with('success', 'Gallery created successfully.');

    }

    public function edit($id)
    {
        $slider = Gallery::findOrFail($id);
        return view('gallery.edit', compact('slider'));
    }

    public function toggleStatus($id)
    {
        $data = Gallery::findOrFail($id);
        $data->is_active = !$data->is_active;
        $data->save();

        return redirect()->route('gallery.index')->with('success', 'Gallery status updated successfully.');
    }


}
