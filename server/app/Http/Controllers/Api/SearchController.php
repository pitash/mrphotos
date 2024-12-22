<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Country;
use App\Models\Gallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->input('search');

        $countries = Country::query()
            ->where('name', 'like',  $query . '%')
            ->where('is_active', true)
            ->pluck('id');

        $galleries = Gallery::query()
            ->where(function ($q) use ($query, $countries) {
                $q->where('title', 'like', value:  $query . '%')
                  ->orWhere('description', 'like', '%' . $query . '%');

                if ($countries->isNotEmpty()) {
                    $q->orWhereIn('country_id', $countries);
                }
            })
            ->where('is_active', true)
            // ->with('country:id,name')
            ->select('id', 'title', 'description', 'image_path', 'country_id')
            ->get();

        return response()->json([
            'galleries' => $galleries,
        ]);

    }
}
