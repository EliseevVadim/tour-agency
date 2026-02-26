<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->json('images')->nullable();
            $table->foreignId('category_id')->constrained()->restrictOnDelete();
            $table->unsignedInteger('old_price')->nullable();
            $table->unsignedInteger('current_price')->nullable();
            $table->boolean('is_hit')->default(false);
            $table->timestamps();

            $table->index('category_id');
            $table->index('is_hit');
            $table->index('current_price');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
