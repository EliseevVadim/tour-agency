<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ClipController;
use App\Http\Controllers\DataController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\PromoCodeController;
use App\Http\Controllers\ReviewsController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\TelegramController;
use App\Http\Controllers\VideoController;
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
require __DIR__ . '/payment.php';

Route::view('/', 'main')->name('home');
Route::view('/contacts', 'contacts')->name('contacts');
Route::view('/shop', 'shop');
Route::view('/courses', 'courses')->name('courses');

Route::prefix('api')->name('api.')->group(function () {
    Route::get("/contacts", [DataController::class, 'getContacts'])->name('contacts.index');
    Route::get("/videos", [VideoController::class, 'getVideos'])->name('videos.index');
    Route::get("/clips", [ClipController::class, 'getClips'])->name('clips.index');

    Route::get('/team', [TeamController::class, 'getTeam'])->name('team.index');
    Route::get('/reviews', [ReviewsController::class, 'getReviews'])->name('reviews.index');

    Route::post('/check-promo-code', [PromoCodeController::class, 'check'])->name('check.promo');
});

Route::post('/telegram/webhook', [TelegramController::class, 'handleWebhook'])->name('telegram.webhook');
Route::get('/payment/return', [PaymentController::class, 'handleReturn'])->name('payment.return');
