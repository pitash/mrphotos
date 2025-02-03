<?php

namespace App\Http\Controllers;

use App\Models\About;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use Illuminate\Support\Facades\Log;

class AboutController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function edit()
    {
        $data = About::first();
        return view('about.update', compact('data'));
    }

    public function update(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'quot1_title' => 'nullable|string|max:255',
            'quot1_desc' => 'nullable|string',
            'quot2_title' => 'nullable|string|max:255',
            'quot2_desc' => 'nullable|string',
            'quot3_title' => 'nullable|string|max:255',
            'quot3_desc' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:40960', // Max 40MB
        ]);

        try {
            $about = About::first() ?? new About();

            if ($request->hasFile('image')) {
                if ($about->image_path && file_exists(public_path($about->image_path))) {
                    unlink(public_path($about->image_path));
                }

                $aboutFolder = 'uploads/images/about';
                if (!file_exists(public_path($aboutFolder))) {
                    mkdir(public_path($aboutFolder), 0755, true);
                }

                $image = $request->file('image');
                $manager = new ImageManager(new Driver());
                $fileName = uniqid() . '.webp';

                $aboutImage = $manager->read($image)
                    ->resize(1200, null, function ($constraint) {
                        $constraint->aspectRatio();
                        $constraint->upsize();
                    });

                if ($aboutImage->height() > 850) {
                    $aboutImage = $aboutImage->resize(null, 850, function ($constraint) {
                        $constraint->aspectRatio();
                        $constraint->upsize();
                    });
                }

                $imagePath = $aboutFolder . '/' . $fileName;
                $aboutImage->toWebp(95)->save(public_path($imagePath));

                $about->image_path = $imagePath;
            }

            $about->name = $request->name;
            $about->description = $request->description;
            $about->quot1_title = $request->quot1_title;
            $about->quot1_desc = $request->quot1_desc;
            $about->quot2_title = $request->quot2_title;
            $about->quot2_desc = $request->quot2_desc;
            $about->quot3_title = $request->quot3_title;
            $about->quot3_desc = $request->quot3_desc;

            $about->save();

            return redirect()->route('about.edit')->with('success', 'About updated successfully.');
        } catch (\Exception $e) {
            // Log::error('Error updating About page: ', [
            //     'error' => $e->getMessage(),
            //     'trace' => $e->getTraceAsString()
            // ]);

            return redirect()->back()->withErrors('Failed to update About. Please try again.');
        }
    }


    public function update2(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'quot1_title' => 'required|string|max:255',
            'quot1_desc' => 'required|string',
            'quot2_title' => 'required|string|max:255',
            'quot2_desc' => 'required|string',
            'quot3_title' => 'required|string|max:255',
            'quot3_desc' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg',
        ]);

        $data = About::first();

        if ($request->hasFile('image')) {
            if ($data->image_path && Storage::disk('public')->exists($data->image_path)) {
                Storage::disk('public')->delete($data->image_path);
            }

            $imagePath = $request->file('image')->store('images/about', 'public');
            $data->image_path = $imagePath;
        }

        $data->update([
            'name' => $request->name,
            'description' => $request->description,
            'quot1_title' => $request->quot1_title,
            'quot1_desc' => $request->quot1_desc,
            'quot2_title' => $request->quot2_title,
            'quot2_desc' => $request->quot2_desc,
            'quot3_title' => $request->quot3_title,
            'quot3_desc' => $request->quot3_desc,
            'is_active' => $request->has('is_active'),
        ]);

        return redirect()->route('about.edit')->with('success', 'About updated successfully.');
    }
}
