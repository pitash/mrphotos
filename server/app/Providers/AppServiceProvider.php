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
        ini_set('max_execution_time', '2000');
        ini_set('max_input_time', '400');

         // Log or debug to verify settings
        logger('memory_limit: ' . ini_get('memory_limit'));
        logger('max_execution_time: ' . ini_get('max_execution_time'));
        logger('max_input_time: ' . ini_get('max_input_time'));

        // Log or debug to verify the values
        // logger('upload_max_filesize: ' . ini_get('upload_max_filesize'));
        // logger('post_max_size: ' . ini_get('post_max_size'));

        // logger('Note: upload_max_filesize and post_max_size must be set in php.ini or .htaccess.');
    }
}
