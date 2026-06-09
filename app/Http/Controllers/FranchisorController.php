<?php

namespace App\Http\Controllers;

use App\Models\Franchisor;

class FranchisorController extends Controller
{
    public function index()
    {
        $franchisors = Franchisor::query()
            ->where('is_active', true)
            ->orderByDesc('id')
            ->get();

        return response()->json([
            'data' => $franchisors,
        ]);
    }
}
