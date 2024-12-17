<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class BlogController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Blog::query();
        $query->where('is_published', true);
        $query->where('is_active', true);

        if ($request->has('country_id')) {
            $query->where('country_id', $request->query('country_id'));
        }

        // $blogs = $query->get();

        $perPage = $request->get('per_page', 10); // 10 items per page
        $blogs = $query->paginate($perPage);

        if ($blogs) {
            return response()->json([
                'success' => true,
                'message' => 'Blog fetched successfully.',
                'data' => $blogs
            ], 200);
        }

        return response()->json([
            'success' => false,
            'message' => 'No Blog data found.',
        ], 404);
    }

    /**
     * Display the specified blog.
     */
    public function show($id): JsonResponse
    {
        if (!is_numeric($id) || $id <= 0) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid blog ID.',
            ], 400);
        }

        $blog = Blog::find($id);

        if (!$blog) {
            return response()->json([
                'success' => false,
                'message' => 'Blog not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $blog,
        ]);
    }


}
