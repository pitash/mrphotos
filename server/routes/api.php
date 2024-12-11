<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\HomePageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/profile', [AuthController::class, 'profile']);

    Route::get('/sliders', [HomePageController::class, 'index']);
    Route::post('/sliders', [HomePageController::class, 'store']);
    Route::put('/sliders/{id}', [HomePageController::class, 'update']);
    Route::patch('/sliders/{id}/toggle-status', [HomePageController::class, 'toggleStatus']);

});

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
