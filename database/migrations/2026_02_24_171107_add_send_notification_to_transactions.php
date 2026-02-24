<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddSendNotificationToTransactions extends Migration
{
    public function up()
    {
        Schema::table('payment_transactions', function (Blueprint $table) {
            $table->string('send_notification')->default(false)->after('expires_at');
        });
    }

    public function down(): void
    {
        Schema::table('payment_transactions', function (Blueprint $table) {
            $table->dropColumn('send_notification');
        });
    }
}
