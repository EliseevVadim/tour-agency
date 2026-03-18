<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ShopPromoCode;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class AdminShopPromoCodesController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $perPage = (int) $request->input('per_page', 20);
        $perPage = $perPage > 0 ? min($perPage, 100) : 20;

        $promoCodes = ShopPromoCode::query()
            ->status($request->input('status'))
            ->orderByDesc('is_active')
            ->orderByRaw('(CASE WHEN max_usages > 0 AND usages_count >= max_usages THEN 1 ELSE 0 END) ASC')
            ->latest('id')
            ->paginate($perPage);

        return response()->json([
            'data' => $promoCodes,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'discount_percent' => ['required', 'integer', 'min:1', 'max:100'],
            'max_usages' => ['nullable', 'integer', 'min:0'],
            'code' => ['nullable', 'string', 'max:50', Rule::unique('shop_promo_codes', 'code')],
        ]);

        $code = !empty($validated['code']) ? Str::upper(trim($validated['code'])) : $this->generateUniqueCode();

        $promoCode = ShopPromoCode::query()->create([
            'code' => $code,
            'discount_percent' => (int) $validated['discount_percent'],
            'max_usages' => (int) ($validated['max_usages'] ?? 0),
            'usages_count' => 0,
        ]);

        return response()->json([
            'data' => $promoCode,
        ], 201);
    }

    protected function generateUniqueCode(int $length = 8): string
    {
        do {
            $code = Str::upper(Str::random($length));
        } while (
            ShopPromoCode::query()->where('code', $code)->exists()
        );

        return $code;
    }

    public function destroy(int $id): JsonResponse
    {
        $promo = ShopPromoCode::query()->findOrFail($id);
        $promo->delete();

        return response()->json([
            'success' => true,
        ]);
    }

    public function toggle(int $id): JsonResponse
    {
        $promoCode = ShopPromoCode::query()->findOrFail($id);

        $promoCode->update([
            'is_active' => !$promoCode->is_active,
        ]);

        $promoCode->refresh();

        return response()->json([
            'data' => $promoCode,
        ]);
    }
}
