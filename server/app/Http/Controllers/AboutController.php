<?php

namespace App\Http\Controllers;

use App\Models\About;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AboutController extends Controller
{
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
