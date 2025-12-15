<?php

use App\Http\Controllers\CoursesController;
use App\Http\Controllers\DataController;
use App\Http\Controllers\ReviewsController;
use App\Http\Controllers\TeamController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;

Route::middleware(['admin.auth.hash'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/team', function () {
        return view('admin.team');
    })->name('team');

    Route::get('/reviews', function () {
        return view('admin.reviews');
    })->name('reviews');

    Route::get('/contacts', function () {
        return view('admin.contacts');
    })->name('contacts');

    Route::get('/courses', function () {
        return view('admin.courses');
    })->name('courses');

    Route::put('/api/contacts', [DataController::class, 'updateContacts'])->name('api.contacts.update');

    Route::post('/api/team', [TeamController::class, 'store'])->name('api.team.store');
    Route::post('/api/team/{id}', [TeamController::class, 'update'])->name('api.team.update');
    Route::delete('/api/team/{id}', [TeamController::class, 'destroy'])->name('api.team.destroy');

    Route::post('/api/review', [ReviewsController::class, 'store'])->name('api.review.store');
    Route::delete('/api/review/{id}', [ReviewsController::class, 'destroy'])->name('api.review.destroy');

    Route::get('/api/transactions', [\App\Http\Controllers\PaymentController::class, 'index']);

    Route::post('/logout', [AdminController::class, 'logout'])->name('logout');
});
