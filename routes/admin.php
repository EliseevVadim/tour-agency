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

    Route::post('/api/clips', [ClipController::class, 'store'])->name('api.clips.store');
    Route::delete('/api/clips/{id}', [ClipController::class, 'destroy'])->name('api.clips.destroy');

    Route::post('/api/videos', [VideoController::class, 'store'])->name('api.videos.store');
    Route::delete('/api/videos/{id}', [VideoController::class, 'destroy'])->name('api.videos.destroy');

    Route::post('/logout', [AdminController::class, 'logout'])->name('logout');
});
