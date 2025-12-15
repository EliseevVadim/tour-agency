<?php

use App\Http\Controllers\PaymentController;
use Illuminate\Support\Facades\Route;

Route::post('/payments/create', [PaymentController::class, 'create'])->name('payment.create');

Route::post('/payments/callback', [PaymentController::class, 'callback'])
    ->name('payment.callback');
