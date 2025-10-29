<?php

use App\Http\Controllers\ClipController;
use App\Http\Controllers\ReviewsController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\VideoController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;
use App\Http\Controllers\AdminController;

Route::middleware(['admin.auth.hash'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/videos', function () {
        return view('admin.videos');
    })->name('videos');

    Route::get('/clips', function () {
        return view('admin.clips');
    })->name('clips');

    Route::get('/team', function () {
        return view('admin.team');
    })->name('team');

    Route::get('/reviews', function () {
        return view('admin.reviews');
    })->name('reviews');

    Route::post('/api/team', [TeamController::class, 'store'])->name('api.team.store');
    Route::post('/api/team/{id}', [TeamController::class, 'update'])->name('api.team.update');
    Route::delete('/api/team/{id}', [TeamController::class, 'destroy'])->name('api.team.destroy');

    Route::post('/api/review', [ReviewsController::class, 'store'])->name('api.review.store');

    Route::post('/logout', [AdminController::class, 'logout'])->name('logout');
});
