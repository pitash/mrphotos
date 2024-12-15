<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\About;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class AboutController extends Controller
{
    public function index(): JsonResponse
    {
        $about = About::first();

        if ($about) {
            return response()->json([
                'success' => true,
                'message' => 'About fetched successfully.',
                'data' => $about,
            ], 200);
        }

        return response()->json([
            'success' => false,
            'message' => 'No About data found.',
        ], 404);
    }
}
