<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDimensionsToProductSkusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::table('product_skus', function (Blueprint $table) {
            $table->integer('weight')->after('stock_qty')->nullable()->comment('Вес в граммах');
            $table->integer('length')->after('weight')->nullable()->comment('Длина упаковки в см');
            $table->integer('width')->after('length')->nullable()->comment('Ширина упаковки в см');
            $table->integer('height')->after('width')->nullable()->comment('Высота упаковки в см');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::table('product_skus', function (Blueprint $table) {
            $table->dropColumn(['weight', 'length', 'width', 'height']);
        });
    }
}
