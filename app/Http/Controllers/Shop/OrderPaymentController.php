<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Http\Requests\CdekCreateOrderRequest;
use App\Models\Order;
use App\Models\OrderPayment;
use App\Models\ProductSku;
use App\Models\ShopPromoCode;
use App\Services\Checkout\OrderDeliveryService;
use App\Services\Cdek\CdekService;
use App\Services\YooKassa\YooKassaService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Throwable;

class OrderPaymentController extends Controller
{
    public function create(CdekCreateOrderRequest $request, CdekService $cdek, YooKassaService $yooKassa): JsonResponse
    {
        DB::beginTransaction();

        try {
            $existingOrderId = $request->input('existing_order_id');

            if ($existingOrderId) {
                $oldOrder = Order::query()
                    ->where('id', $existingOrderId)
                    ->lockForUpdate()
                    ->first();

                if ($oldOrder && $oldOrder->payment_status !== 'paid') {
                    $this->releaseStock($oldOrder);
                    $oldOrder->payments()->delete();
                    $oldOrder->delete();
                }
            }

            $deliveryMode = $request->input('delivery_mode');
            $phone = $cdek->normalizePhone($request->input('recipient_phone'));
            $items = $request->input('items', []);

            $promoCode = null;
            $discountPercent = 0;
            $discountAmount = 0.0;

            if ($request->filled('promo_code_id')) {
                $promoCode = ShopPromoCode::query()
                    ->lockForUpdate()
                    ->find($request->input('promo_code_id'));

                if (!$promoCode || !$promoCode->canBeUsed()) {
                    DB::rollBack();

                    return response()->json([
                        'success' => false,
                        'errors' => ['Промокод недействителен'],
                    ], 422);
                }

                $discountPercent = (int) $promoCode->discount_percent;
            }

            $this->reserveStock($items);

            $itemsOriginalPrice = collect($items)->sum(function ($item) {
                $qty = (int) ($item['quantity'] ?? $item['amount'] ?? 1);
                return ((float) ($item['cost'] ?? 0)) * $qty;
            });

            if ($discountPercent > 0) {
                $discountAmount = round($itemsOriginalPrice * $discountPercent / 100, 2);
                Log::info('$discountAmount');
                Log::info($discountAmount);
            }

            $itemsPrice = max(round($itemsOriginalPrice - $discountAmount, 2), 0);
            $deliveryPrice = (float) $request->input('delivery_price');
            $totalPrice = round($itemsPrice + $deliveryPrice, 2);

            $tariffCode = $request->filled('tariff_code')
                ? (int) $request->input('tariff_code')
                : (int) ($deliveryMode === 'pickup'
                    ? config('cdek.tariffs.pickup')
                    : config('cdek.tariffs.door'));

            $order = Order::create([
                'number' => 'ORD-' . now()->format('YmdHis') . '-' . Str::upper(Str::random(4)),
                'promo_code_id' => $promoCode ? $promoCode->id : null,
                'customer_name' => $request->input('recipient_name'),
                'customer_phone' => $phone,
                'customer_email' => $request->input('recipient_email'),
                'delivery_mode' => $deliveryMode,
                'city' => $request->input('city'),
                'city_code' => $request->input('city_code'),
                'street' => $deliveryMode === 'door' ? $request->input('street') : null,
                'house' => $deliveryMode === 'door' ? $request->input('house') : null,
                'flat' => $deliveryMode === 'door' ? $request->input('flat') : null,
                'entrance' => $deliveryMode === 'door' ? $request->input('entrance') : null,
                'floor' => $deliveryMode === 'door' ? $request->input('floor') : null,
                'pickup_point_code' => $deliveryMode === 'pickup' ? $request->input('pickup_point_code') : null,
                'pickup_point_address' => $deliveryMode === 'pickup' ? $request->input('pickup_point_address') : null,
                'tariff_code' => $tariffCode,
                'delivery_price' => $deliveryPrice,
                'items_price' => $itemsPrice,
                'total_price' => $totalPrice,
                'package_weight' => (int) $request->input('package.weight'),
                'package_length' => (int) $request->input('package.length'),
                'package_width' => (int) $request->input('package.width'),
                'package_height' => (int) $request->input('package.height'),
                'status' => 'pending',
                'payment_status' => 'pending',
                'items' => $items,
                'delivery_meta' => [],
            ]);

            $paymentPayload = $yooKassa->buildPaymentPayload([
                'amount' => $itemsPrice,
                'description' => 'Оплата заказа ' . $order->number,
                'metadata' => [
                    'order_id' => (string) $order->id,
                    'order_number' => (string) $order->number,
                ],
            ]);

            $paymentResult = $yooKassa->createPayment($paymentPayload, (string) Str::uuid());

            if (empty($paymentResult['success'])) {
                DB::rollBack();

                Log::warning('YooKassa create payment failed', [
                    'order_id' => $order->id,
                    'order_number' => $order->number,
                    'errors' => $paymentResult['errors'] ?? [],
                    'response' => $paymentResult['data'] ?? [],
                ]);

                return response()->json([
                    'success' => false,
                    'errors' => $paymentResult['errors'] ?? ['Не удалось создать платеж'],
                ], 422);
            }

            $paymentData = $paymentResult['data'];
            $confirmationUrl = data_get($paymentData, 'confirmation.confirmation_url');

            if (!$confirmationUrl) {
                DB::rollBack();

                Log::warning('YooKassa confirmation url is missing', [
                    'order_id' => $order->id,
                    'order_number' => $order->number,
                    'payment_data' => $paymentData,
                ]);

                return response()->json([
                    'success' => false,
                    'errors' => ['Платеж создан, но ссылка на оплату не получена'],
                ], 422);
            }

            OrderPayment::create([
                'order_id' => $order->id,
                'payment_id' => $paymentData['id'] ?? null,
                'amount' => $totalPrice,
                'status' => $paymentData['status'] ?? 'pending',
                'response_payload' => $paymentData,
                'callback_payload' => null,
                'paid_at' => null,
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'order_id' => $order->id,
                'order_number' => $order->number,
                'payment_id' => $paymentData['id'] ?? null,
                'payment_status' => $paymentData['status'] ?? null,
                'confirmation_url' => $confirmationUrl,
            ], 201);
        } catch (Throwable $e) {
            DB::rollBack();

            $message = $e->getMessage();
            $isStockError = str_contains($message, 'Недостаточно остатка')
                || str_contains($message, 'SKU not found')
                || str_contains($message, 'SKU is missing');

            Log::error('Create order payment exception', [
                'message' => $message,
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ]);

            return response()->json([
                'success' => false,
                'errors' => [$isStockError ? $message : 'Ошибка создания заказа'],
            ], $isStockError ? 422 : 500);
        }
    }

    public function webhook(Request $request, YooKassaService $yooKassa, OrderDeliveryService $orderDeliveryService): JsonResponse {
        $payload = $request->all();
        $event = data_get($payload, 'event');
        $paymentId = data_get($payload, 'object.id');
        $metadataOrderId = data_get($payload, 'object.metadata.order_id');

        if (!$paymentId) {
            return response()->json([
                'success' => false,
                'errors' => ['Payment id is missing'],
            ], 400);
        }

        try {
            $paymentInfo = $yooKassa->getPayment($paymentId);

            if (empty($paymentInfo['success'])) {
                Log::warning('YooKassa payment verification failed', [
                    'payment_id' => $paymentId,
                    'errors' => $paymentInfo['errors'] ?? [],
                ]);

                return response()->json(['success' => false], 422);
            }

            $paymentObject = $paymentInfo['data'];
            $status = $paymentObject['status'] ?? null;

            $order = null;
            $shouldCreateDelivery = false;

            DB::transaction(function () use (
                $paymentId,
                $metadataOrderId,
                $payload,
                $paymentObject,
                $status,
                &$order,
                &$shouldCreateDelivery
            ) {
                $payment = OrderPayment::query()
                    ->where('payment_id', $paymentId)
                    ->lockForUpdate()
                    ->first();

                if (!$payment && $metadataOrderId) {
                    $order = Order::query()
                        ->where('id', $metadataOrderId)
                        ->lockForUpdate()
                        ->first();

                    if ($order) {
                        $payment = OrderPayment::query()
                            ->where('order_id', $order->id)
                            ->latest('id')
                            ->lockForUpdate()
                            ->first();
                    }
                }

                if (!$payment) {
                    throw new \RuntimeException('Payment not found: ' . $paymentId);
                }

                if (!$order) {
                    $order = Order::query()
                        ->where('id', $payment->order_id)
                        ->lockForUpdate()
                        ->first();
                }

                if (!$order) {
                    throw new \RuntimeException('Order not found for payment: ' . $paymentId);
                }

                $payment->update([
                    'payment_id' => $paymentId,
                    'status' => $status,
                    'callback_payload' => $payload,
                    'response_payload' => $paymentObject,
                    'paid_at' => $status === 'succeeded' ? now() : $payment->paid_at,
                ]);

                if ($status === 'succeeded') {
                    $alreadyPaid = $order->payment_status === 'paid';

                    $order->update([
                        'payment_status' => 'paid',
                        'paid_at' => $order->paid_at ?: now(),
                        'payment_method' => data_get($paymentObject, 'payment_method.type'),
                        'status' => 'paid',
                    ]);

                    if (!$alreadyPaid) {
                        if ($order->promo_code_id) {
                            $promoCode = ShopPromoCode::query()
                                ->lockForUpdate()
                                ->find($order->promo_code_id);

                            if ($promoCode) {
                                $promoCode->increment('usages_count');
                            }
                        }

                        if (!$order->cdek_uuid && $order->status !== 'delivery_created') {
                            $shouldCreateDelivery = true;
                        }
                    }

                    return;
                }

                if ($status === 'canceled') {
                    $alreadyCanceled = $order->payment_status === 'canceled';

                    if (!$alreadyCanceled && $order->payment_status !== 'paid') {
                        $this->releaseStock($order);
                    }

                    $order->update([
                        'payment_status' => 'canceled',
                        'status' => 'canceled',
                    ]);

                    return;
                }

                if ($status === 'waiting_for_capture') {
                    $order->update([
                        'payment_status' => 'waiting_for_capture',
                    ]);
                }
            });

            if ($status === 'succeeded' && $shouldCreateDelivery && $order) {
                $deliveryResult = $orderDeliveryService->createCdekOrderIfNeeded($order->fresh());

                $order->update([
                    'promo_code_id' => null,
                ]);

                if (empty($deliveryResult['success'])) {
                    Log::warning('CDEK create after YooKassa succeeded payment failed', [
                        'order_id' => $order->id,
                        'payment_id' => $paymentId,
                        'errors' => $deliveryResult['errors'] ?? [],
                    ]);
                }
            }

            Log::info('YooKassa webhook handled', [
                'event' => $event,
                'payment_id' => $paymentId,
                'order_id' => $order->id,
                'status' => $status,
                'delivery_started' => $shouldCreateDelivery,
            ]);

            return response()->json(['success' => true], 200);
        } catch (Throwable $e) {
            Log::error('YooKassa webhook exception', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'payload' => $payload,
            ]);

            return response()->json(['success' => false], 500);
        }
    }

    private function reserveStock(array $items): void
    {
        foreach ($items as $item) {
            $skuCode = $item['sku'] ?? null;

            if (!$skuCode) {
                throw new \RuntimeException('SKU is missing');
            }

            $qty = (int)($item['quantity'] ?? $item['amount'] ?? 1);

            $sku = ProductSku::query()
                ->where('sku', $skuCode)
                ->lockForUpdate()
                ->first();

            if (!$sku) {
                throw new \RuntimeException('SKU not found: ' . $skuCode);
            }

            if ($qty <= 0) {
                throw new \RuntimeException('Некорректное количество для SKU ' . $skuCode);
            }

            if ($sku->stock_qty < $qty) {
                throw new \RuntimeException('Недостаточно остатка для SKU ' . $skuCode);
            }

            $sku->decrement('stock_qty', $qty);
        }
    }

    private function releaseStock(Order $order): void
    {
        $items = is_array($order->items) ? $order->items : [];

        foreach ($items as $item) {
            $skuCode = $item['sku'] ?? null;

            if (!$skuCode) {
                continue;
            }

            $qty = (int)($item['quantity'] ?? $item['amount'] ?? 1);

            if ($qty <= 0) {
                continue;
            }

            $sku = ProductSku::query()
                ->where('sku', $skuCode)
                ->lockForUpdate()
                ->first();

            if (!$sku) {
                Log::warning('SKU not found while releasing stock', [
                    'sku' => $skuCode,
                    'order_id' => $order->id,
                ]);
                continue;
            }

            $sku->increment('stock_qty', $qty);
        }
    }

    public function handleReturn(Request $request)
    {
        return redirect('/shop?payment_return=1');
    }

    public function status(Order $order): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => [
                'order_id' => $order->id,
                'order_number' => $order->number,
                'status' => $order->status,
                'payment_status' => $order->payment_status,
                'paid_at' => $order->paid_at,
                'cdek_uuid' => $order->cdek_uuid,
            ],
        ]);
    }
}
