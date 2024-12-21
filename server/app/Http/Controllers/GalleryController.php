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
        $countries = Country::where('is_active', true)->orderBy('name', 'asc')->get();
        $datas = Gallery::orderBy('id', 'desc')->get();
        return view('gallery.index', compact('datas','countries'));
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
        $data = Gallery::findOrFail($id);

        return response()->json([
            'title' => $data->title,
            'description' => $data->description,
            'country_id' => $data->country_id,
            'image_path' => $data->image_path,
            'main_image' => $data->image_path ? asset('storage/' . $data->image_path) : null,
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'country_id' => 'required|integer',
        ]);

        $data = Gallery::findOrFail($id);

        // Update basic fields
        $data->title = $request->title;
        $data->description = $request->description;

        // Check if the country has changed
        $oldCountryId = $data->country_id;
        $newCountryId = $request->country_id;
        $data->country_id = $newCountryId;

        $country = Country::findOrFail($newCountryId);

        // Define the new country-specific folder
        $newCountryFolder = 'images/galleries/' . Str::snake(Str::lower($country->name));

        // Create the folder if it doesn't exist
        if (!Storage::disk('public')->exists($newCountryFolder)) {
            Storage::disk('public')->makeDirectory($newCountryFolder);
        }

        if ($request->hasFile('image')) {
            // Delete the old image if it exists
            if ($data->image_path && Storage::disk('public')->exists($data->image_path)) {
                Storage::disk('public')->delete($data->image_path);
            }

            // Store the new image in the new country-specific folder
            $imagePath = $request->file('image')->store($newCountryFolder, 'public');
            $data->image_path = $imagePath;
        } else {
            // Move the existing image to the new country folder if the country has changed
            if ($oldCountryId != $newCountryId && $data->image_path && Storage::disk('public')->exists($data->image_path)) {
                $oldImagePath = $data->image_path;
                $newImagePath = $newCountryFolder . '/' . basename($oldImagePath);

                // Move the image to the new folder
                Storage::disk('public')->move($oldImagePath, $newImagePath);
                $data->image_path = $newImagePath;
            }
        }

        $data->save();

        return redirect()->route('gallery.index')->with('success', 'Gallery updated successfully.');
    }


    public function toggleStatus($id)
    {
        $data = Gallery::findOrFail($id);
        $data->is_active = !$data->is_active;
        $data->save();

        return redirect()->route('gallery.index')->with('success', 'Gallery status updated successfully.');
    }


}
