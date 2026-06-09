<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHotelsTable extends Migration
{
    public function up(): void
    {
        Schema::create('hotels', function (Blueprint $table) {
            $table->id();

            $table->string('name');
            $table->string('country')->nullable();
            $table->unsignedTinyInteger('stars')->default(5);

            $table->text('description')->nullable();
            $table->string('image_path')->nullable();
            $table->string('link')->nullable();

            $table->boolean('is_active')->default(true);

            $table->timestamps();

            $table->index('is_active');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hotels');
    }
}
