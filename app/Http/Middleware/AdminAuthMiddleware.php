<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Hash; // Импортируем Hash фасад
use Illuminate\Support\Facades\Session; // Для управления сессией

class AdminAuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $adminEmail = config('admin.admin_email');
        $adminHashedPassword = config('admin.admin_hashed_password');

        if (session('admin_logged_in') === true && session('admin_email') === $adminEmail) {
            return $next($request);
        }

        if ($request->isMethod('post') && $request->route()->getName() === 'admin.login.submit') {
            if (session('admin_logged_in') !== true || session('admin_email') !== $adminEmail) {
                return redirect()->route('admin.login.show');
            } else {
                return $next($request);
            }
        }

        if ($request->isMethod('get')) {
            if ($request->route()->getName() !== 'admin.login.show') {
                return redirect()->route('admin.login.show');
            }
        }

        return $next($request);
    }
}
