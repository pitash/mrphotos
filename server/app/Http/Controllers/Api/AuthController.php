<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse as HttpJsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\JsonResponse;

class AuthController extends Controller
{
    public function login(Request $request): HttpJsonResponse
    {
        try {
            $request->validate([
                "email" => "required|email|max:255",
                "password" => "required|string|min:8|max:255"
            ]);

            $user = User::where("email", $request->email)->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json([
                    "success" => false,
                    "message" => "Credentials are incorrect."
                ], 401);
            }

            $token = $user->createToken($user->name . "paragon")->plainTextToken;

            return response()->json([
                "success" => true,
                "message" => "Login successful.",
                "data" => [
                    "token_type" => "Bearer",
                    "token" => $token,
                ]
            ], 200);
        } catch (ValidationException $e) {
            return response()->json([
                "success" => false,
                "errors" => $e->errors()
            ], 422);
        }
    }

    public function register(Request $request): HttpJsonResponse
    {
        try {
            $request->validate([
                "name" => "required|string|max:255",
                "email" => "required|email|unique:users,email|max:255",
                "password" => "required|string|min:8|max:255"
            ]);

            $user = User::create([
                "name" => $request->name,
                "email" => $request->email,
                "password" => Hash::make($request->password),
            ]);

            if ($user) {
                $token = $user->createToken("paragon" . $user->id)->plainTextToken;

                return response()->json([
                    "success" => true,
                    "message" => "Registration successful.",
                    "data" => [
                        "token_type" => "Bearer",
                        "token" => $token,
                    ]
                ], 200);
            } else {
                return response()->json([
                    "success" => false,
                    "message" => "User registration failed. Please try again later."
                ], 500);
            }
        } catch (ValidationException $e) {
            return response()->json([
                "success" => false,
                "errors" => $e->errors()
            ], 422);
        }
    }

    public function profile(Request $request): JsonResponse
    {
        $user = $request->user();

        if ($user) {
            return response()->json([
                "success" => true,
                "message" => "Profile fetched successfully.",
                "data" => [
                    "user" => $user
                ]
            ], 200);
        }

        return response()->json([
            "success" => false,
            "message" => "Not authenticated."
        ], 401);
    }

    public function logout(Request $request)
    {
        $user = User::where("id", $request->user()->id)->first();
        if ($user) {
            $user->tokens()->delete();

            return response()->json([
                "success" => true,
                "message" => "Logout successfully.",
                "data" => [
                    "user" => $user
                ]
            ], 200);
        }

        return response()->json([
            "success" => false,
            "message" => "User Not Found."
        ], 404);
    }

}
