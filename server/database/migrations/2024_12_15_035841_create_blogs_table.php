<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('blogs', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->string('image');
            $table->json('galleries');
            $table->integer('comments_count')->default(0);
            $table->date('published_date')->nullable();

            // Foreign key to countries table (assuming the countries table has an `id` column as unsignedBigInteger)
            $table->foreignId('country_id')->constrained('countries')->onDelete('cascade');

            // Foreign key to categories table (assuming the categories table has an `id` column as unsignedBigInteger)
            $table->foreignId('category_id')->constrained('categories')->onDelete('cascade');

            $table->boolean('is_active')->default(false);
            $table->boolean('is_published')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blogs');
    }
};
