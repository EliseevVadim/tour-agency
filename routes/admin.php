<?php

use App\Http\Controllers\Admin\ReferralController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\DataController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\PromoCodeController;
use App\Http\Controllers\ReviewsController;
use App\Http\Controllers\TeamController;
use Illuminate\Support\Facades\Route;

Route::middleware(['admin.auth.hash'])->prefix('admin')->name('admin.')->group(function () {
    Route::view('/team', 'admin.team')->name('team');
    Route::view('/reviews', 'admin.reviews')->name('reviews');
    Route::view('/contacts', 'admin.contacts')->name('contacts');
    Route::view('/courses', 'admin.courses')->name('courses');

    Route::post('/logout', [AdminController::class, 'logout'])->name('logout');

    Route::prefix('api')->name('api.')->group(function () {
        Route::prefix('contacts')->name('contacts.')->group(function () {
            Route::put('/', [DataController::class, 'updateContacts'])->name('update');
        });
        Route::post('/team', [TeamController::class, 'store'])->name('team.store');
        Route::post('/team/{id}', [TeamController::class, 'update'])->name('team.update');
        Route::delete('/team/{id}', [TeamController::class, 'destroy'])->name('team.destroy');

        Route::post('/review', [ReviewsController::class, 'store'])->name('review.store');
        Route::delete('/review/{id}', [ReviewsController::class, 'destroy'])->name('review.destroy');

        Route::get('/transactions', [PaymentController::class, 'index'])->name('transactions.index');

        Route::get('/packages', [PromoCodeController::class, 'getPackages'])->name('api.packages.index');
        Route::post('/promo-rules', [PromoCodeController::class, 'store'])->name('api.promo.store');
        Route::get('/promo-codes', [PromoCodeController::class, 'index'])->name('api.promo.index');

        Route::prefix('referrals')->name('referrals.')->group(function () {
            Route::post('/', [ReferralController::class, 'storeApi'])->name('store-api');
            Route::get('/', [ReferralController::class, 'indexApi'])->name('index-api');
            Route::delete('/{referral}', [ReferralController::class, 'destroyApi'])->name('api.referrals.destroy');
            Route::get('/{referral}/transactions', [ReferralController::class, 'getTransactionsForReferral'])->name('api.referrals.transactions');
        });
    });
});
