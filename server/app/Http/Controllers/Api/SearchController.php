<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Country;
use App\Models\Gallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->input('search');

        $galleries = Gallery::query()
            ->where('title', 'like', '%' . $query . '%')
            ->where('is_active', true)
            ->select('id', 'title', 'description','image_path','country_id')
            ->get();

        $categories = Category::query()
            ->where('name', 'like', '%' . $query . '%')
            ->where('is_active', true)
            ->select('id', 'name')
            // ->limit(5)
            ->get();

        $countries = Country::query()
            ->where('name', 'like', '%' . $query . '%')
            ->where('is_active', true)
            ->select('id', 'name')
            ->get();

        return response()->json([
            'galleries' => $galleries,
            'categories' => $categories,
            'countries' => $countries,
        ]);

    }
}
