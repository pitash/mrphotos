<?php

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ContactFormController;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\HomePageController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    // return view('welcome');
    return redirect('/login');
});

Auth::routes();

Route::get('/login', function () {
    return view('auth.login');
})->middleware('guest')->name('login');

Route::post('logout', function () {
    Auth::logout();
    return redirect()->route('login');
})->name('logout');

Route::get('/clear-cache', function () {
    Artisan::call('config:clear');
    Artisan::call('cache:clear');
    Artisan::call('route:clear');
    return 'Cache cleared!';
});

Route::middleware('auth')->group(function () {
    Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

    Route::get('/test-image', [HomePageController::class, 'test']);
    Route::get('/sliders', [HomePageController::class, 'index'])->name('sliders.index');
    Route::post('/sliders', [HomePageController::class, 'store'])->name('sliders.store');
    Route::get('/sliders/{id}/edit', [HomePageController::class, 'edit'])->name('sliders.edit');
    Route::patch('/sliders/{id}', [HomePageController::class, 'update'])->name('sliders.update');
    Route::patch('/sliders/{id}/toggle-status', [HomePageController::class, 'toggleStatus'])->name('sliders.toggleStatus');
    Route::delete('/sliders/{id}', [HomePageController::class, 'destroy'])->name('sliders.destroy');


    Route::get('/gallery', [GalleryController::class, 'index'])->name('gallery.index');
    Route::post('/gallery', [GalleryController::class, 'store'])->name('gallery.store');
    Route::get('/gallery/{id}/edit', [GalleryController::class, 'edit'])->name('gallery.edit');
    Route::match(['put', 'patch'], '/gallery/{id}', [GalleryController::class, 'update'])->name('gallery.update');
    Route::patch('/gallery/{id}/toggle-status', [GalleryController::class, 'toggleStatus'])->name('gallery.toggleStatus');
    Route::delete('/gallery/{id}', [GalleryController::class, 'destroy'])->name('gallery.destroy');

    Route::get('/country', [CountryController::class, 'index'])->name('country.index');
    Route::get('/country/create', [CountryController::class, 'create'])->name('country.create');
    Route::post('/country', [CountryController::class, 'store'])->name('country.store');
    Route::get('/country/{id}/edit', [CountryController::class, 'edit'])->name('country.edit');
    Route::patch('/country/{id}', [CountryController::class, 'update'])->name('country.update');
    Route::patch('/country/{id}/toggle-status', [CountryController::class, 'toggleStatus'])->name('country.toggleStatus');

    Route::get('/about/edit', [AboutController::class, 'edit'])->name('about.edit');
    Route::patch('/about/update', [AboutController::class, 'update'])->name('about.update');

    Route::get('/contact', [ContactController::class, 'edit'])->name('contact');
    Route::patch('/contact/update', [ContactController::class, 'update'])->name('contact.update');

    Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
    Route::post('/blog', [BlogController::class, 'store'])->name('blog.store');
    Route::get('/blog/{id}/edit', [BlogController::class, 'edit'])->name('blog.edit');
    Route::patch('/blog/{id}', [BlogController::class, 'update'])->name('blog.update');
    Route::patch('/blog/{id}/toggle-status', [BlogController::class, 'toggleStatus'])->name('blog.toggleStatus');

    Route::get('/category', [CategoryController::class, 'index'])->name('category.index');
    Route::post('/category', [CategoryController::class, 'store'])->name('category.store');
    Route::get('/category/{id}/edit', [CategoryController::class, 'edit'])->name('category.edit');
    Route::patch('/category/{id}', [CategoryController::class, 'update'])->name('category.update');
    Route::patch('/category/{id}/toggle-status', [CategoryController::class, 'toggleStatus'])->name('category.toggleStatus');

    Route::get('contact-forms', [ContactFormController::class, 'index'])->name('contactForms.index');
});

