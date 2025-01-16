<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use App\Models\HomePage;

class HomePageController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $sliders = HomePage::orderBy('is_active', 'asc')->get();
        return view('sliders.index', compact('sliders'));
    }
    public function store(Request $request)
    {
        $request->validate([
            'tag' => 'required|string|max:255',
            'heading' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:40960', // Max 40MB
        ]);

        if ($request->hasFile('image')) {
            $image = $request->file('image');

            // Generate a unique filename
            // $fileName = uniqid() . '.' . $image->getClientOriginalExtension();
            $fileName = uniqid() . '.webp';

            // Define the directory path to store the image
            $directoryPath = public_path('uploads/images/slider/');

            // Ensure the directory exists
            if (!is_dir($directoryPath)) {
                mkdir($directoryPath, 0755, true);
            }

            $manager = new ImageManager(new Driver());
            // read image from file system
            $image = $manager->read($image);
            // $image = $image->resize(1920, 720);
            // $image->toWebp(80)->save($directoryPath. $fileName);
            // $imagePath = 'uploads/images/slider/' . $fileName;


            // Resize the image while maintaining the original aspect ratio
            $image = $image->resize(1920, null, function ($constraint) {
                $constraint->aspectRatio(); // Maintain aspect ratio
                $constraint->upsize(); // Prevent upscaling
            });

            // Check if the height exceeds the maximum allowed and resize again
            if ($image->height() > 1080) {
                $image = $image->resize(null, 1080, function ($constraint) {
                    $constraint->aspectRatio();
                    $constraint->upsize();
                });
            }

            // Convert the image to WebP and save it
            $image->toWebp(80)->save($directoryPath . $fileName);
            $imagePath = 'uploads/images/slider/' . $fileName;

        }

        $slider = HomePage::create([
            'tag' => $request->tag,
            'heading' => $request->heading,
            'image_path' => $imagePath,
            'is_active' => true,
        ]);

        return redirect()->route('sliders.index')->with('success', 'Slider created successfully.');
    }

    public function edit($id)
    {
        $data = HomePage::findOrFail($id);

        return response()->json([
            'tag' => $data->tag,
            'heading' => $data->heading,
            'main_image' => $data->image_path ? asset($data->image_path) : null,
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'tag' => 'required|string|max:255',
            'heading' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:40960', // Max 40MB
        ]);

        try {
            $slider = HomePage::findOrFail($id);

            $slider->tag = $request->tag;
            $slider->heading = $request->heading;

            if ($request->hasFile('image')) {
                // Delete the old image if it exists
                if ($slider->image_path && file_exists(public_path($slider->image_path))) {
                    unlink(public_path($slider->image_path));
                }

                $image = $request->file('image');
                $fileName = uniqid() . '.webp';
                $directoryPath = public_path('uploads/images/slider/');

                if (!is_dir($directoryPath)) {
                    mkdir($directoryPath, 0755, true);
                }

                $manager = new ImageManager(new Driver());
                $image = $manager->read($image);
                $image = $image->resize(1920, null, function ($constraint) {
                    $constraint->aspectRatio();
                    $constraint->upsize();
                });

                if ($image->height() > 1080) {
                    $image = $image->resize(null, 1080, function ($constraint) {
                        $constraint->aspectRatio();
                        $constraint->upsize();
                    });
                }

                $image->toWebp(80)->save($directoryPath . $fileName);

                // Store the new image
                $slider->image_path = 'uploads/images/slider/' . $fileName;
            }

            $slider->save();

            return redirect()->route('sliders.index')->with('success', 'Slider updated successfully.');
        } catch (\Exception $e) {
            // \Log::error('Slider update failed:', ['error' => $e->getMessage()]);
            return redirect()->route('sliders.index')->with('error', 'Failed to update slider. Please try again.');
        }
    }

    public function toggleStatus($id)
    {
        $data = HomePage::findOrFail($id);
        $data->toggleStatus();

        return redirect()->route('sliders.index')->with('success', 'Slider status updated successfully.');
    }

    public function destroy($id)
    {
        try {
            $slider = HomePage::findOrFail($id);

            if ($slider->image_path && file_exists(public_path($slider->image_path))) {
                unlink(public_path($slider->image_path));
            }

            $slider->delete();

            return redirect()->route('sliders.index')->with('success', 'Slider deleted successfully.');
        } catch (\Exception $e) {
            // \Log::error('Failed to delete slider:', ['error' => $e->getMessage()]);

            return redirect()->route('sliders.index')->with('error', 'Failed to delete slider. Please try again.');
        }
    }


}
