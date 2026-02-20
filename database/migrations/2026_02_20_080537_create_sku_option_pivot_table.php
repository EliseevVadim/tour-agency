<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSkuOptionPivotTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('sku_option_pivot', function (Blueprint $table) {
            $table->string('sku');
            $table->foreignId('option_id')->constrained('product_attribute_options');
            $table->primary(['sku', 'option_id']);
            $table->foreign('sku')->references('sku')->on('product_skus')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sku_option_pivot');
    }
}
