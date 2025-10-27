<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ClipController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\VideoController;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/admin/login', [AdminController::class, 'showLoginForm'])->name('admin.login.show');

Route::post('/admin/login', [AdminController::class, 'login'])->name('admin.login.submit');

require __DIR__.'/admin.php';

Route::get('/', function () {
    return view('main');
});

Route::get('/initialize-clips', [ClipController::class, 'initializeJsonFile'])->name('clips.initialize');
Route::get('/initialize-videos', [VideoController::class, 'initializeJsonFile'])->name('videos.initialize');
Route::get('/initialize-reviews', [\App\Http\Controllers\ReviewsController::class, 'initializeJsonFile'])->name('reviews.initialize');
Route::get('/initialize-team', [TeamController::class, 'initializeJsonFile'])->name('team.initialize');

Route::get('/api/clips', [ClipController::class, 'getClips'])->name('api.clips.index');
Route::post('/api/clips', [ClipController::class, 'store'])->name('api.clips.store');
Route::delete('/api/clips/{id}', [ClipController::class, 'destroy'])->name('api.clips.destroy');

Route::get('/api/videos', [VideoController::class, 'getVideos'])->name('api.videos.index');
Route::post('/api/videos', [VideoController::class, 'store'])->name('api.videos.store');
Route::delete('/api/videos/{id}', [VideoController::class, 'destroy'])->name('api.videos.destroy');
