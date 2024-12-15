<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ContactController extends Controller
{
    public function index(): JsonResponse
    {
        $contact = Contact::first();

        if ($contact) {
            return response()->json([
                'success' => true,
                'message' => 'Contact fetched successfully.',
                'data' => $contact,
            ], 200);
        }

        return response()->json([
            'success' => false,
            'message' => 'No Contact data found.',
        ], 404);
    }

}
