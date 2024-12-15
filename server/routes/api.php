<?php

use App\Http\Controllers\Api\AboutController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\GalleryController;
use App\Http\Controllers\Api\HomePageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/profile', [AuthController::class, 'profile']);

    // Route::get('/sliders', [HomePageController::class, 'index']);
    Route::post('/sliders', [HomePageController::class, 'store']);
    Route::put('/sliders/{id}', [HomePageController::class, 'update']);
    Route::patch('/sliders/{id}/toggle-status', [HomePageController::class, 'toggleStatus']);

});


Route::get('/sliders', [HomePageController::class, 'index']);
Route::get('/about', [AboutController::class, 'index']);
Route::get('/contact', [ContactController::class, 'index']);

Route::get('/galleries', [GalleryController::class, 'index']);
Route::get('/countries', [GalleryController::class, 'getAllCountries']);
Route::get('/galleries1/{countryId}', [GalleryController::class, 'getGalleriesByCountry']);
Route::get('/galleries/{countryId}', [GalleryController::class, 'getGalleriesByCountry2']);
Route::get('/all-galleries', [GalleryController::class, 'getGalleries'])->name('galleries');

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
