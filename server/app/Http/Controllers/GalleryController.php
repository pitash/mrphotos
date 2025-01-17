<?php

namespace App\Http\Controllers;

use App\Models\Country;
use App\Models\Gallery;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use Illuminate\Support\Facades\Log;

class GalleryController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

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
            'description' => 'required|string|max:700',
            'image' => 'required|array',
            'image.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:40960',
            'country_id' => 'required|exists:countries,id',
        ]);

        try {

            $country = Country::findOrFail($request->country_id);

            // Define directory paths
            $galleryFolder = 'uploads/images/galleries/' . Str::snake(Str::lower($country->name));
            $thumbnailFolder = $galleryFolder . '/thumbnails';
            $fullFolder = $galleryFolder . '/full';

            // Ensure directories exist
            foreach ([$galleryFolder, $thumbnailFolder, $fullFolder] as $folder) {
                if (!file_exists(public_path($folder))) {
                    mkdir(public_path($folder), 0755, true);
                }
            }

            $manager = new ImageManager(new Driver());

            // Process each uploaded image
            foreach ($request->file('image') as $image) {

                $fileName = uniqid();
                $thumbName = $fileName . '_thumb.webp';
                $fullName = $fileName . '.webp';

                // For full-size image
                $fullImage = $manager->read($image)
                    ->resize(1920, null, function ($constraint) {
                        $constraint->aspectRatio();
                        $constraint->upsize();
                    });

                if ($fullImage->height() > 1080) {
                    $fullImage = $fullImage->resize(null, 1080, function ($constraint) {
                        $constraint->aspectRatio();
                        $constraint->upsize();
                    });
                }

                $fullImagePath = $fullFolder . '/' . $fullName;
                $fullImage->toWebp(90)->save(public_path($fullImagePath));

                // For thumbnail image
                $thumbnail = $manager->read($image)
                    ->resize(400, null, function ($constraint) {
                        $constraint->aspectRatio();
                        $constraint->upsize();
                    });

                if ($thumbnail->height() > 200) {
                    $thumbnail = $thumbnail->resize(null, 200, function ($constraint) {
                        $constraint->aspectRatio();
                        $constraint->upsize();
                    });
                }

                $thumbnailPath = $thumbnailFolder . '/' . $thumbName;
                $thumbnail->toWebp(90)->save(public_path($thumbnailPath));

                // Save to database
                Gallery::create([
                    'title' => $request->title,
                    'description' => $request->description,
                    'image_path' => $fullImagePath,
                    'thumbnail_path' => $thumbnailPath,
                    'country_id' => $request->country_id,
                    'image_link' => $request->image_link,
                    'is_active' => true,
                ]);
            }

            // Redirect with success message
            return redirect()->route('gallery.index')->with('success', 'Gallery created successfully.');

        } catch (\Exception $e) {
            // Log the error for debugging
            // Log::error('Error storing gallery: ' . $e->getMessage());

            // Redirect back with error message
            return redirect()->back()->withErrors('Failed to create gallery. Please try again.');
        }
    }

    public function store2(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
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
            'main_image' => $data->image_path ? asset($data->image_path) : null,
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:700',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:40960',
            'country_id' => 'required|exists:countries,id',
            'image_link' => 'nullable|url',
        ]);

        try {
            $gallery = Gallery::findOrFail($id);

            // Update basic fields
            $gallery->title = $request->title;
            $gallery->description = $request->description;
            $gallery->image_link = $request->image_link;

            // Handle country change
            $oldCountryId = $gallery->country_id;
            $newCountryId = $request->country_id;
            $gallery->country_id = $newCountryId;

            $oldCountry = Country::findOrFail($oldCountryId);
            $newCountry = Country::findOrFail($newCountryId);

            // Define directory paths for old and new countries
            $oldGalleryFolder = 'uploads/images/galleries/' . Str::snake(Str::lower($oldCountry->name));
            $newGalleryFolder = 'uploads/images/galleries/' . Str::snake(Str::lower($newCountry->name));
            $newThumbnailFolder = $newGalleryFolder . '/thumbnails';
            $newFullFolder = $newGalleryFolder . '/full';

            // Ensure new directories exist
            foreach ([$newGalleryFolder, $newThumbnailFolder, $newFullFolder] as $folder) {
                if (!file_exists(public_path($folder))) {
                    mkdir(public_path($folder), 0755, true);
                }
            }

            // Handle image upload
            if ($request->hasFile('image')) {
                $manager = new ImageManager(new Driver());
                $image = $request->file('image');

                // Generate unique filenames
                $fileName = uniqid();
                $thumbName = $fileName . '_thumb.webp';
                $fullName = $fileName . '.webp';

                // For full-size image
                $fullImage = $manager->read($image)
                    ->resize(1920, null, function ($constraint) {
                        $constraint->aspectRatio();
                        $constraint->upsize();
                    });

                if ($fullImage->height() > 1080) {
                    $fullImage = $fullImage->resize(null, 1080, function ($constraint) {
                        $constraint->aspectRatio();
                        $constraint->upsize();
                    });
                }

                $fullImagePath = $newFullFolder . '/' . $fullName;
                $fullImage->toWebp(90)->save(public_path($fullImagePath));

                // For thumbnail image
                $thumbnail = $manager->read($image)
                    ->resize(400, null, function ($constraint) {
                        $constraint->aspectRatio();
                        $constraint->upsize();
                    });

                if ($thumbnail->height() > 200) {
                    $thumbnail = $thumbnail->resize(null, 200, function ($constraint) {
                        $constraint->aspectRatio();
                        $constraint->upsize();
                    });
                }

                $thumbnailPath = $newThumbnailFolder . '/' . $thumbName;
                $thumbnail->toWebp(90)->save(public_path($thumbnailPath));

                // Delete old images
                if ($gallery->image_path && file_exists(public_path($gallery->image_path))) {
                    unlink(public_path($gallery->image_path));
                }
                if ($gallery->thumbnail_path && file_exists(public_path($gallery->thumbnail_path))) {
                    unlink(public_path($gallery->thumbnail_path));
                }

                // Update paths in the database
                $gallery->image_path = $fullImagePath;
                $gallery->thumbnail_path = $thumbnailPath;
            } else {
                // Move existing images to the new country folder if the country has changed
                if ($oldCountryId != $newCountryId) {
                    if ($gallery->image_path && file_exists(public_path($gallery->image_path))) {
                        $oldImagePath = $gallery->image_path;
                        $newImagePath = $newFullFolder . '/' . basename($oldImagePath);

                        rename(public_path($oldImagePath), public_path($newImagePath));
                        $gallery->image_path = $newImagePath;
                    }

                    if ($gallery->thumbnail_path && file_exists(public_path($gallery->thumbnail_path))) {
                        $oldThumbnailPath = $gallery->thumbnail_path;
                        $newThumbnailPath = $newThumbnailFolder . '/' . basename($oldThumbnailPath);

                        rename(public_path($oldThumbnailPath), public_path($newThumbnailPath));
                        $gallery->thumbnail_path = $newThumbnailPath;
                    }
                }
            }

            $gallery->save();

            return redirect()->route('gallery.index')->with('success', 'Gallery updated successfully.');
        } catch (\Exception $e) {
            // Log error
            //Log::error('Error updating gallery: ' . $e->getMessage());

            // Redirect back with error message
            return redirect()->back()->withErrors('Failed to update gallery. Please try again.');
        }
    }


    public function update2(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg',
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



    //After selecting an ID from the search API, then redirect that galleries
    public function show($id)
    {
        // $gallery = Gallery::select('id', 'title', 'description', 'image_path', 'country_id')
        //     ->where('id', $id)
        //     ->where('is_active', true)
        //     ->first();

        // if (!$gallery) {
        //     return response()->json([
        //         'success' => false,
        //         'message' => 'Gallery not found.',
        //     ], 404);
        // }

        // $gallery->image_url = url('storage/' . $gallery->image_path);

        // return response()->json([
        //     'success' => true,
        //     'message' => 'Gallery fetched successfully.',
        //     'data' => $gallery,
        // ], 200);

        $galleryItem = Gallery::find($id);

        // Check if the gallery item was found
        if (!$galleryItem) {
            return response()->json(['message' => 'Gallery item not found'], 404);
        }

        // Return the found gallery item
        return response()->json($galleryItem);

    }

    public function destroy($id)
    {
        try {
            $gallery = Gallery::findOrFail($id);

            // Delete the associated files if they exist
            if (file_exists(public_path($gallery->image_path))) {
                unlink(public_path($gallery->image_path));
            }
            if (file_exists(public_path($gallery->thumbnail_path))) {
                unlink(public_path($gallery->thumbnail_path));
            }

            $gallery->delete();

            return redirect()->route('gallery.index')->with('success', 'Gallery item deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->route('gallery.index')->withErrors('Failed to delete gallery item. Please try again.');
        }
    }



}
