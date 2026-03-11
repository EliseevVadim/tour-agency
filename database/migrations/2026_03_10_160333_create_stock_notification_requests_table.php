<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStockNotificationRequestsTable extends Migration
{
    public function up()
    {
        Schema::create('stock_notification_requests', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('product_id')->index();
            $table->string('sku')->nullable()->index();
            $table->string('product_name')->nullable();

            $table->string('phone')->nullable()->index();
            $table->string('email')->nullable()->index();

            $table->json('attributes')->nullable();
            $table->json('attribute_names')->nullable();

            $table->boolean('is_notified')->default(false)->index();
            $table->timestamp('notified_at')->nullable();

            $table->timestamps();

            $table->foreign('product_id')
                ->references('id')
                ->on('products')
                ->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('stock_notification_requests');
    }
}
