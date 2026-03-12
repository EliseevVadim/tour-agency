<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Http\Requests\CdekCreateOrderRequest;
use App\Models\Order;
use App\Models\OrderPayment;
use App\Services\Cdek\CdekService;
use App\Services\Checkout\OrderDeliveryService;
use App\Services\YooKassa\YooKassaService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Throwable;

class OrderPaymentController extends Controller
{
    public function create(CdekCreateOrderRequest $request, CdekService $cdek, YooKassaService $yooKassa)
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
                    $oldOrder->payments()->delete();
                    $oldOrder->delete();
                }
            }

            $deliveryMode = $request->input('delivery_mode');
            $phone = $cdek->normalizePhone($request->input('recipient_phone'));
            $items = $request->input('items', []);

            $itemsPrice = collect($items)->sum(function ($item) {
                $qty = (int) ($item['quantity'] ?? ($item['amount'] ?? 1));

                return ((float) ($item['cost'] ?? 0)) * $qty;
            });

            $deliveryPrice = (float) $request->input('delivery_price');
            $totalPrice = round($itemsPrice + $deliveryPrice, 2);

            $tariffCode = $request->filled('tariff_code')
                ? (int) $request->input('tariff_code')
                : (int) ($deliveryMode === 'pickup'
                    ? config('cdek.tariffs.pickup')
                    : config('cdek.tariffs.door'));

            $order = Order::create([
                'number' => 'ORD-' . now()->format('YmdHis') . '-' . Str::upper(Str::random(4)),
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
                'amount' => $itemsPrice,
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

            Log::error('Create order payment exception', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ]);

            return response()->json([
                'success' => false,
                'errors' => ['Ошибка создания заказа'],
            ], 500);
        }
    }

    public function webhook(Request $request, YooKassaService $yooKassa, OrderDeliveryService $orderDeliveryService)
    {
        $payload = $request->all();
        $event = data_get($payload, 'event');
        $paymentId = data_get($payload, 'object.id');
        $metadataOrderId = data_get($payload, 'object.metadata.order_id');

        Log::info('YooKassa webhook received', [
            'event' => $event,
            'payment_id' => $paymentId,
            'metadata_order_id' => $metadataOrderId,
            'payload' => $payload,
        ]);

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
                    'event' => $event,
                    'response' => $paymentInfo['data'] ?? [],
                    'errors' => $paymentInfo['errors'] ?? [],
                ]);

                return response()->json(['success' => false], 422);
            }

            $paymentObject = $paymentInfo['data'];
            $status = $paymentObject['status'] ?? null;

            $order = null;
            $shouldCreateDelivery = false;

            DB::transaction(function () use (
                $paymentId, $metadataOrderId, $payload, $paymentObject,
                $status, &$order, &$shouldCreateDelivery
            ) {
                $payment = OrderPayment::where('payment_id', $paymentId)
                    ->lockForUpdate()
                    ->first();

                if (!$payment && $metadataOrderId) {
                    $order = Order::where('id', $metadataOrderId)
                        ->lockForUpdate()
                        ->first();

                    if ($order) {
                        $payment = OrderPayment::where('order_id', $order->id)
                            ->latest('id')
                            ->lockForUpdate()
                            ->first();
                    }
                }

                if (!$payment) {
                    throw new \RuntimeException('Payment not found: ' . $paymentId);
                }

                if (!$order) {
                    $order = Order::where('id', $payment->order_id)
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

                    if (!$alreadyPaid && !$order->cdek_uuid && $order->status !== 'delivery_created') {
                        $shouldCreateDelivery = true;
                    }
                } elseif ($status === 'canceled') {
                    $order->update([
                        'payment_status' => 'canceled',
                        'status' => 'canceled',
                    ]);
                } elseif ($status === 'waiting_for_capture') {
                    $order->update([
                        'payment_status' => 'waiting_for_capture',
                    ]);
                }
            });

            if ($status === 'succeeded' && $shouldCreateDelivery && $order) {
                $deliveryResult = $orderDeliveryService->createCdekOrderIfNeeded($order->fresh());

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
                'order_id' => $order ? $order->id : null,
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
