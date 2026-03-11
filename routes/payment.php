<?php

use App\Http\Controllers\PaymentController;
use App\Http\Controllers\Shop\OrderPaymentController;
use Illuminate\Support\Facades\Route;

Route::post('/payments/create', [PaymentController::class, 'create'])->name('payment.create');

Route::post('/payments/callback', [PaymentController::class, 'callback'])
    ->name('payment.callback');

Route::post('/gc-payments/create', [PaymentController::class, 'cancel'])->name('gc-payment.create');
Route::post('/payment/success', [\App\Http\Controllers\GetCourseController::class, 'handleSuccessPayment'])
    ->name('payment.success');
Route::post('/payment/failure', [\App\Http\Controllers\GetCourseController::class, 'handleFailurePayment'])
    ->name('payment.failure');
Route::post('/payment/cooldown', [\App\Http\Controllers\GetCourseController::class, 'handleCooldownPayment'])
    ->name('payment.cooldown');
Route::post('payment/user-failure', [\App\Http\Controllers\GetCourseController::class, 'handleUserFailurePayment'])
    ->name('payment.user-failure');

Route::prefix('shop')->name('shop.')->group(function () {
    Route::post('/payments/yookassa/webhook', [OrderPaymentController::class, 'webhook'])
        ->name('payments.yookassa.webhook');
});
