<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ClipController;
use App\Http\Controllers\DataController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ReviewsController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\TelegramController;
use App\Http\Controllers\VideoController;
use App\Services\PaymentService;
use Illuminate\Http\Request;
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

Route::get('/', function () {
    return view('main');
});
Route::get('/contacts', function () {
   return view('contacts');
})->name('contacts');
Route::get('/shop', function () {
   return view('shop');
});
Route::get('/courses', function () {
   return view('courses');
})->name('courses');

Route::get("/api/contacts", [DataController::class, 'getContacts']);
Route::get("/api/videos", [VideoController::class, 'getVideos']);
Route::get("/api/clips", [ClipController::class, 'getClips']);

Route::get('/api/team', [TeamController::class, 'getTeam'])->name('api.team.index');
Route::get('/api/reviews', [ReviewsController::class, 'getReviews'])->name('api.reviews.index');

Route::post('/telegram/webhook', [TelegramController::class, 'handleWebhook'])->name('telegram.webhook');

Route::get('/payment/return', [PaymentController::class, 'handleReturn'])->name('payment.return');


Route::get('/test-payment-url', function (PaymentService $paymentService) {
    $mockRequest = new Request([
        'amount' => 15000.00,
        'course_name' => 'Ultimate Travel',
        'package_id' => 'opti',
        'full_name' => 'Тестовый Пользователь',
        'phone_number' => '+79991234567',
        'email' => 'maritaly98@gmail.com',
    ]);

    $controller = new PaymentController($paymentService);
    try {
        $paymentUrl = $controller->create($mockRequest, $paymentService);
        return "URL для оплаты успешно сгенерирован: <a target='_blank' href='$paymentUrl'>Перейти к оплате</a>";

    } catch (Exception $e) {
        return "Ошибка при создании платежа: " . $e->getMessage();
    }
})->name('test.payment.url');
