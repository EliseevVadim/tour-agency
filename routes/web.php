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

require __DIR__ . '/admin.php';

Route::get('/', function () {
    return view('main');
});

Route::get("/api/videos", [VideoController::class, 'getVideos']);
Route::get("/api/clips", [ClipController::class, 'getClips']);

Route::get('/api/team', [TeamController::class, 'getTeam'])->name('api.team.index');
Route::get('/api/reviews', [\App\Http\Controllers\ReviewsController::class, 'getReviews'])->name('api.reviews.index');
