<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\HomePageController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('/sliders', [HomePageController::class, 'index'])->name('sliders.index');
Route::get('/sliders/create', [HomePageController::class, 'create'])->name('sliders.create');
Route::post('/sliders', [HomePageController::class, 'store'])->name('sliders.store');
Route::get('/sliders/{id}/edit', [HomePageController::class, 'edit'])->name('sliders.edit');
Route::put('/sliders/{id}', [HomePageController::class, 'update'])->name('sliders.update');

Route::get('/gallery', [GalleryController::class, 'index'])->name('gallery.index');
Route::get('/gallery/create', [GalleryController::class, 'create'])->name('gallery.create');
Route::post('/gallery', [GalleryController::class, 'store'])->name('gallery.store');
Route::get('/gallery/{id}/edit', [GalleryController::class, 'edit'])->name('gallery.edit');
Route::put('/gallery/{id}', [GalleryController::class, 'update'])->name('gallery.update');
Route::patch('/gallery/{id}/toggle-status', [GalleryController::class, 'toggleStatus'])->name('gallery.toggleStatus');

Route::get('/country', [CountryController::class, 'index'])->name('country.index');
Route::get('/country/create', [CountryController::class, 'create'])->name('country.create');
Route::post('/country', [CountryController::class, 'store'])->name('country.store');
Route::get('/country/{id}/edit', [CountryController::class, 'edit'])->name('country.edit');
Route::put('/country/{id}', [CountryController::class, 'update'])->name('country.update');
Route::patch('/country/{id}/toggle-status', [CountryController::class, 'toggleStatus'])->name('country.toggleStatus');

Route::get('/about/edit', [AboutController::class, 'edit'])->name('about.edit');
Route::patch('/about/update', [AboutController::class, 'update'])->name('about.update');

Route::get('/contact/edit', [ContactController::class, 'edit'])->name('contact.edit');
Route::patch('/contact/update', [ContactController::class, 'update'])->name('contact.update');
