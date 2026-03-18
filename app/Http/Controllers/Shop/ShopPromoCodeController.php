<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Models\ShopPromoCode;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Request;

class ShopPromoCodeController extends Controller
{
    public function check(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'code' => ['required', 'string'],
        ]);

        $code = mb_strtoupper(trim($validated['code']));
        $promoCode = ShopPromoCode::query()
            ->where('code', $code)
            ->first();

        if (!$promoCode) {
            return response()->json([
                'success' => false,
                'message' => 'Промокод не найден',
            ], 404);
        }

        if (!$promoCode->canBeUsed()) {
            return response()->json([
                'success' => false,
                'message' => 'Лимит использований промокода исчерпан',
            ], 422);
        }

        return response()->json([
            'success' => true,
            'message' => 'Промокод применён',
            'data' => [
                'id' => $promoCode->id,
                'code' => $promoCode->code,
                'discount_percent' => $promoCode->discount_percent,
                'max_usages' => $promoCode->max_usages,
                'usages_count' => $promoCode->usages_count,
                'remaining_usages' => $promoCode->remaining_usages,
                'status' => $promoCode->status,
            ],
        ]);
    }
}
