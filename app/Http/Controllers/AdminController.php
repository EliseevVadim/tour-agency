<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;

class AdminController extends Controller
{
    public function showLoginForm()
    {
        if (session('admin_logged_in') === true && session('admin_email') === config('admin.admin_email')) {
            return redirect()->route('admin.videos');
        }
        return view('admin.auth.login');
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $adminEmail = config('admin.admin_email');
        $adminHashedPassword = config('admin.admin_hashed_password');

        if ($request->input('email') === $adminEmail && Hash::check($request->input('password'), $adminHashedPassword)) {
            $request->session()->put('admin_logged_in', true);
            $request->session()->put('admin_email', $adminEmail);

            $this->initializeData();

            return redirect()->route('admin.videos');
        }

        return back()->withErrors([
            'email' => 'Неверный email или пароль.',
        ])->withInput();
    }

    public function logout(Request $request)
    {
        Session::forget('admin_logged_in');
        Session::forget('admin_email');

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('admin.login.show');
    }

    public function dashboard()
    {
        return view('admin.videos');
    }

    public function initializeData(): string
    {
        $clipController = new ClipController();
        $videoController = new ClipController();
        $reviewsController = new ClipController();
        $teamController = new ClipController();

        $clipController->initializeJsonFile();
        $videoController->initializeJsonFile();
        $reviewsController->initializeJsonFile();
        $teamController->initializeJsonFile();

        return 'Все данные были инициализированы.';
    }
}
