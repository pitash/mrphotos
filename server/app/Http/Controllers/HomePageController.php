<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\HomePage;

class HomePageController extends Controller
{
    public function index()
    {
        $sliders = HomePage::all();
        return view('sliders.index', compact('sliders'));
    }
    public function create()
    {
        return view('sliders.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'tag' => 'required|string|max:255',
            'heading' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg',
        ]);

        $imagePath = $request->file('image')->store('images/slider', 'public');

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
        $slider = HomePage::findOrFail($id);
        return view('sliders.edit', compact('slider'));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'tag' => 'required|string|max:255',
            'heading' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg',
        ]);

        $slider = HomePage::findOrFail($id);

        $slider->tag = $request->tag;
        $slider->heading = $request->heading;

        // Handle image upload if a new image is provided
        if ($request->hasFile('image')) {
            // Delete the old image if it exists
            if ($slider->image_path && file_exists(public_path('storage/' . $slider->image_path))) {
                unlink(public_path('storage/' . $slider->image_path));
            }

            // Store the new image
            $imagePath = $request->file('image')->store('images/slider', 'public');
            $slider->image_path = $imagePath;
        }

        $slider->save();

        return redirect()->route('sliders.index')->with('success', 'Slider updated successfully.');
    }

}