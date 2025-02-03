<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Country;
use App\Models\Gallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SearchController extends Controller
{
    // public function search(Request $request)
    // // {
    // //     $request->validate([
    // //         'query' => 'required|string|min:3',
    // //     ]);

    // //     $query = $request->input('query');

    // //     $countries = Country::query()
    // //         ->where('name', 'like',  $query . '%')
    // //         ->where('is_active', true)
    // //         ->pluck('id');

    // //     $galleries = Gallery::query()
    // //         ->where(function ($q) use ($query, $countries) {
    // //             $q->where('title', 'like', $query . '%')
    // //               ->orWhere('description', 'like', $query . '%');

    // //             if ($countries->isNotEmpty()) {
    // //                 $q->orWhereIn('country_id', $countries);
    // //             }
    // //         })
    // //         ->where('is_active', true)
    // //         // ->with('country:id,name')
    // //         ->select('id', 'title', 'description', 'image_path', 'country_id')
    // //         ->get()
    // //         ->map(function ($gallery) {
    // //             $gallery->image_url = url('storage/' . $gallery->image_path);
    // //             $gallery->redirect_url = url('/api/search/' . $gallery->id);
    // //             return $gallery;
    // //         });

    // //     return response()->json([
    // //         'galleries' => $galleries,
    // //     ]);

    // // }


    public function search(Request $request)
    {
        $request->validate([
            'query' => 'required|string|min:3',
        ]);

        $query = $request->input('query');

        $countries = Country::query()
            ->where('name', 'like', $query . '%')
            ->where('is_active', true)
            ->pluck('id');

        $galleries = Gallery::query()
            ->where(function ($q) use ($query, $countries) {
                $q->where('title', 'like', $query . '%')
                ->orWhere('description', 'like', $query . '%');

                if ($countries->isNotEmpty()) {
                    $q->orWhereIn('country_id', $countries);
                }
            })
            ->where('is_active', true)
            ->select('id', 'title', 'description', 'thumbnail_path', 'country_id')
            ->get()
            ->map(function ($gallery) {
                $gallery->image_url = url($gallery->thumbnail_path);
                return $gallery;
            });

        return response()->json(['galleries' => $galleries]);
    }
}
