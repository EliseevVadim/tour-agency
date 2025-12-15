<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaymentTransactionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('payment_transactions', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('package_id');
            $table->foreign('package_id')->references('id')->on('packages')->onDelete('restrict');

            $table->uuid('payment_id')->nullable()->comment('Системный ID платежа в YooKassa');
            $table->string('payment_method')->nullable();
            $table->string('status')->default('pending');
            $table->decimal('amount', 10, 2)->default(0);

            $table->dateTime('payment_at')->nullable();
            $table->timestamps();

            $table->index('status');
            $table->index('payment_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('payment_transactions');
    }
}
