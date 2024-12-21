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
        $galleries = Gallery::select('id', 'title', 'description', 'image_path', 'country_id')
                    ->where('is_active', true)
                    ->orderBy('id', 'desc')
                    ->paginate(3);

        return response()->json([
            'success' => true,
            'message' => $galleries->isEmpty() ? 'No Gallery data found.' : 'Galleries fetched successfully.',
            'data' => $galleries
        ], 200);

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
        // // If no countryId is provided, return all galleries
        // if (is_null($countryId)) {
        //     return $this->index();
        // }


        // return galleries for the given country
        $galleries = Gallery::select('id', 'title', 'description', 'image_path')
            ->where('country_id', $countryId)
            ->where('is_active', true)
            ->orderBy('id', 'desc')
            ->paginate(3);

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

}
