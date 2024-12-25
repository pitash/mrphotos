<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        ini_set('upload_max_filesize', '50M');
        ini_set('post_max_size', '50M');
        ini_set('memory_limit', '512M');
        ini_set('max_execution_time', '1200');
        ini_set('max_input_time', '300');

        // Log or debug to verify the values
        // logger('upload_max_filesize: ' . ini_get('upload_max_filesize'));
        // logger('post_max_size: ' . ini_get('post_max_size'));
    }
}
