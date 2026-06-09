<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFranchisorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('franchisors', function (Blueprint $table) {
            $table->id();

            $table->string('name');
            $table->string('city')->nullable();
            $table->string('phone')->nullable();
            $table->text('description')->nullable();

            $table->string('image_path')->nullable();
            $table->string('link')->nullable();

            $table->boolean('is_active')->default(true);

            $table->timestamps();

            $table->index(['is_active']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('franchisors');
    }
}
