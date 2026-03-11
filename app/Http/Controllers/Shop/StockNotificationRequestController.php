<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\StockNotificationRequest;
use App\Services\Cdek\NotificationOrderService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Throwable;

class StockNotificationRequestController extends Controller
{
    public function store(Request $request, NotificationOrderService $notificationOrderService): JsonResponse
    {
        $validated = $request->validate([
            'product_id' => ['required', 'integer', 'exists:products,id'],
            'sku' => ['nullable', 'string', 'max:255'],
            'product_name' => ['nullable', 'string', 'max:255'],
            'customer_name' => ['nullable', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'attributes' => ['nullable', 'array'],
            'attribute_names' => ['nullable', 'array'],
        ]);

        if (empty($validated['phone']) && empty($validated['email'])) {
            return response()->json([
                'success' => false,
                'errors' => ['Укажите телефон или email'],
            ], 422);
        }

        try {
            $product = Product::findOrFail($validated['product_id']);

            $requestModel = StockNotificationRequest::create([
                'product_id' => $validated['product_id'],
                'sku' => $validated['sku'] ?? null,
                'product_name' => $validated['product_name'] ?? $product->name,
                'customer_name' => $validated['customer_name'] ?? null,
                'phone' => $validated['phone'] ?? null,
                'email' => $validated['email'] ?? null,
                'attributes' => $validated['attributes'] ?? [],
                'attribute_names' => $validated['attribute_names'] ?? [],
                'is_notified' => false,
            ]);

            try {
                $notificationOrderService->sendBackInStockRequest([
                        'id' => $requestModel->id,
                        'product_id' => $requestModel->product_id,
                        'sku' => $requestModel->sku,
                        'name' => $requestModel->product_name,
                        'phone' => $requestModel->phone,
                        'email' => $requestModel->email,
                        'attribute_names' => $requestModel->attribute_names,
                    ] + (array) $requestModel->attributes);
            } catch (Throwable $e) {
                Log::error('Telegram back-in-stock notification failed', [
                    'request_id' => $requestModel->id,
                    'message' => $e->getMessage(),
                ]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Заявка на уведомление сохранена',
                'data' => $requestModel,
            ], 201);
        } catch (Throwable $e) {
            Log::error('StockNotificationRequest store failed', [
                'message' => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'errors' => [$e->getMessage()],
            ], 500);
        }
    }
}
