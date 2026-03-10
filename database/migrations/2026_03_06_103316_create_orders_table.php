<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();

            $table->string('number')->unique();

            $table->string('customer_name');
            $table->string('customer_phone');
            $table->string('customer_email')->nullable();

            $table->string('delivery_mode')->default('door'); // door | pickup

            $table->string('city')->nullable();
            $table->unsignedBigInteger('city_code')->nullable();

            $table->string('street')->nullable();
            $table->string('house')->nullable();
            $table->string('flat')->nullable();
            $table->string('entrance')->nullable();
            $table->string('floor')->nullable();

            $table->string('pickup_point_code')->nullable();
            $table->string('pickup_point_address')->nullable();

            $table->unsignedInteger('tariff_code')->nullable();
            $table->decimal('delivery_price', 10, 2)->default(0);
            $table->decimal('items_price', 10, 2)->default(0);
            $table->decimal('total_price', 10, 2)->default(0);

            $table->unsignedInteger('package_weight')->default(0);
            $table->unsignedInteger('package_length')->default(0);
            $table->unsignedInteger('package_width')->default(0);
            $table->unsignedInteger('package_height')->default(0);

            $table->string('status')->default('new'); // new, delivery_created, paid, canceled, delivered
            $table->string('delivery_status')->nullable();

            $table->uuid('cdek_uuid')->nullable();
            $table->string('cdek_number')->nullable();

            $table->json('items')->nullable();
            $table->json('delivery_meta')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
