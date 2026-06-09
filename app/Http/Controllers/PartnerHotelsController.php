<?php

namespace App\Http\Controllers;

use App\Models\Franchisor;
use App\Models\Hotel;

class PartnerHotelsController extends Controller
{
    public function index()
    {
        $hotels = Hotel::query()
            ->where('is_active', true)
            ->orderByDesc('id')
            ->get();

        return response()->json([
            'data' => $hotels,
        ]);
    }
}
