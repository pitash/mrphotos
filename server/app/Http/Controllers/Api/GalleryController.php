<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Country;
use App\Models\Gallery;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class GalleryController extends Controller
{
    public function index(): JsonResponse
    {
        $galleries = Gallery::where('is_active', true)
                            ->orderBy('id', 'desc')
                            ->get();

        if ($galleries) {
            return response()->json([
                'success' => true,
                'message' => 'Galleries fetched successfully.',
                'data' => $galleries
            ], 200);
        }

        return response()->json([
            'success' => false,
            'message' => 'No Gallery data found.',
        ], 404);

    }


    public function getAllCountries()
    {
        $countries = Country::where('is_active', true)->get();

        if ($countries) {
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

    public function getGalleriesByCountry2($countryId = null)
    {
        // If no countryId is provided, return all galleries
        if (is_null($countryId)) {
            return $this->getAllGalleries();
        }

        // Otherwise, return galleries for the given country
        $galleries = Gallery::where('country_id', $countryId)
            ->where('is_active', true)
            ->orderBy('id', 'desc')
            ->get();

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

}
