<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HomePage;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class HomePageController extends Controller
{
    public function index(): JsonResponse
    {
        $sliders = HomePage::where('is_active', true)->get();

        if ($sliders) {
            return response()->json([
                'success' => true,
                'message' => 'Sliders fetched successfully.',
                'data' => $sliders
            ], 200);
        }

        return response()->json([
            'success' => false,
            'message' => 'No About data found.',
        ], 404);

    }

    public function store(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'tag' => 'required|string|max:255',
                'heading' => 'required|string|max:255',
                'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg',
            ]);

            $imagePath = $request->file('image')->store('public/sliders');

            $slider = HomePage::create([
                'tag' => $request->tag,
                'heading' => $request->heading,
                'image_path' => $imagePath,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Slider created successfully.',
                'data' => $slider
            ], 201);

        }catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An unexpected error occurred.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id): JsonResponse
    {
        try {
            $request->validate([
                'tag' => 'required|string|max:255',
                'heading' => 'required|string|max:255',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg',
                // 'is_active' => 'nullable|boolean',
            ]);

            $slider = HomePage::findOrFail($id);

            if ($request->hasFile('image')) {
                 // Delete the old image if it exists
                if ($slider->image_path && file_exists(storage_path('app/' . $slider->image_path))) {
                    unlink(storage_path('app/' . $slider->image_path));
                }

                // Store the new image
                $imagePath = $request->file('image')->store('public/sliders');
                $slider->image_path = $imagePath;
            }

            $slider->tag = $request->input('tag');
            $slider->heading = $request->input('heading');
            $slider->is_active = $request->input('is_active');
            $slider->save();

            return response()->json([
                'success' => true,
                'message' => 'Slider updated successfully.',
                'data' => $slider
            ], 200);
        }catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed.',
                'errors' => $e->errors()
            ], 422);
        }catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An unexpected error occurred.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function toggleStatus($id): JsonResponse
    {
        $slider = HomePage::findOrFail($id);
        $slider->is_active = !$slider->is_active;
        $slider->save();

        return response()->json([
            'success' => true,
            'message' => 'Slider status updated successfully.',
            'data' => $slider
        ], 200);
    }
}
