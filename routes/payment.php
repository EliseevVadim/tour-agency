<?php

use App\Http\Controllers\PaymentController;
use Illuminate\Support\Facades\Route;

Route::post('/payments/create', [PaymentController::class, 'create'])->name('payment.create');

Route::post('/payments/callback', [PaymentController::class, 'callback'])
    ->name('payment.callback');

Route::post('/gc-payments/create', [PaymentController::class, 'cancel'])->name('gc-payment.create');
Route::get('/payment/success', [\App\Http\Controllers\GetCourseController::class, 'handleSuccessPayment'])
    ->name('payment.success');
Route::get('/payment/failure', [\App\Http\Controllers\GetCourseController::class, 'handleFailurePayment'])
    ->name('payment.failure');
