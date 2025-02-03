<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Country;
use App\Models\Gallery;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class GalleryController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        // Get 'per_page' from request body, default to 3
        $perPage = $request->input('per_page', 3);

        $galleries = Gallery::select('id', 'title', 'description', 'thumbnail_path', 'image_path', 'country_id')
                    ->where('is_active', true)
                    ->orderBy('id', 'desc')
                    ->paginate($perPage);

        $galleries->transform(function ($gallery) {
            $gallery->image_url = url($gallery->thumbnail_path);
            return $gallery;
        });

        return response()->json([
            'success' => true,
            'message' => $galleries->isEmpty() ? 'No Gallery data found.' : 'Galleries fetched successfully.',
            'data' => $galleries
        ], 200);
    }

    public function getAllCountries()
    {
        $countries = Country::where('is_active', true)->orderBy('name', 'asc')->get();

        if ($countries) {
            $countries->prepend([
                'id' => 0,
                'name' => 'All Images'
            ]);
            $countries->push([
                'id' => -1,
                'search_flag' => 'images/search/search.jpg'
            ]);
            return response()->json([
                'success' => true,
                'message' => 'Countries fetched successfully.',
                'data' => $countries
            ], 200);
        }

        return response()->json([
            'success' => false,
            'message' => 'No active countries found.',
        ], 404);
    }

    public function getGalleriesByCountry($countryId)
    {
        $galleries = Gallery::where('country_id', $countryId)
            ->where('is_active', true)
            ->orderBy('id', 'desc')
            ->get();

        if ($galleries->isNotEmpty()) {
            return response()->json([
                'success' => true,
                'message' => 'Galleries fetched successfully.',
                'data' => $galleries
            ], 200);
        }

        return response()->json([
            'success' => false,
            'message' => 'No Gallery data found for this country.',
        ], 404);
    }

    public function getGalleriesByCountry2(Request $request, $countryId = null)
    {
        $perPage = $request->input('per_page', 3);

        // return galleries for the given country
        $galleries = Gallery::select('id', 'title', 'description', 'image_path', 'thumbnail_path')
            ->where('country_id', $countryId)
            ->where('is_active', true)
            ->orderBy('id', 'desc')
            ->paginate($perPage);

        if ($galleries->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'No galleries found for this country.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Galleries for the country fetched successfully.',
            'data' => $galleries
        ], 200);

        // return response()->json([
        //     'success' => true,
        //     'message' => 'Galleries for the country fetched successfully.',
        //     'data' => $galleries,
        //     'pagination' => [
        //         'total' => $galleries->total(),
        //         'per_page' => $galleries->perPage(),
        //         'current_page' => $galleries->currentPage(),
        //         'last_page' => $galleries->lastPage(),
        //         'next_page_url' => $galleries->nextPageUrl(),
        //         'prev_page_url' => $galleries->previousPageUrl(),
        //     ]
        // ], 200);
    }

    public function getGalleries(Request $request)
    {
        $countryId = $request->input('countryId', null);

        $galleries = Gallery::when($countryId, function ($query) use ($countryId) {
            return $query->where('country_id', $countryId);
        })->get();
        $countries = Country::all();

        return response()->json([
            'galleries' => $galleries,
            'countries' => $countries,
        ]);
    }


    public function show($id)
    {
        $galleryItem = Gallery::find($id);

        if (!$galleryItem) {
            return response()->json(['message' => 'Gallery item not found'], 404);
        }

        $galleryItem->image_url = url($galleryItem->image_path);

        return response()->json($galleryItem);
    }

}
