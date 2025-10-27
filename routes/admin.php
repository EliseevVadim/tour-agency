<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;
use App\Http\Controllers\AdminController;

Route::middleware(['admin.auth.hash'])->prefix('admin')->name('admin.')->group(function () {
    // Пример другого маршрута в админке
    // Route::get('/settings', [AdminController::class, 'settings'])->name('settings');

    Route::get('/videos', function () {
        return view('admin.videos');
    })->name('videos');

    Route::get('/clips', function () {
        return view('admin.clips');
    })->name('clips');

    Route::post('/logout', [AdminController::class, 'logout'])->name('logout');
});
