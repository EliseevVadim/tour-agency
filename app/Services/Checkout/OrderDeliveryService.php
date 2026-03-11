<?php

namespace App\Services\Checkout;

use App\Models\Order;
use App\Services\Cdek\CdekService;
use App\Services\Cdek\NotificationOrderService;
use Illuminate\Support\Facades\Log;
use Throwable;

class OrderDeliveryService
{
    /**
     * @var CdekService
     */
    protected $cdek;

    /**
     * @var NotificationOrderService
     */
    protected $notificationOrderService;

    public function __construct(CdekService $cdek, NotificationOrderService $notificationOrderService)
    {
        $this->cdek = $cdek;
        $this->notificationOrderService = $notificationOrderService;
    }

    public function createCdekOrderIfNeeded(Order $order)
    {
        if ($order->cdek_uuid || $order->delivery_status === 'created') {
            return [
                'success' => true,
                'already_created' => true,
            ];
        }

        $items = is_array($order->items) ? $order->items : array();
        $payload = $this->buildCreateOrderPayload($order, $items);

        $result = $this->cdek->createOrder($payload);

        if (empty($result['success'])) {
            $deliveryMeta = is_array($order->delivery_meta) ? $order->delivery_meta : array();
            $deliveryMeta['cdek_errors'] = isset($result['errors']) ? $result['errors'] : array();

            $order->update([
                'status' => 'delivery_failed',
                'delivery_meta' => $deliveryMeta,
            ]);

            Log::warning('CDEK createOrder after payment failed', [
                'order_id' => $order->id,
                'order_number' => $order->number,
                'errors' => isset($result['errors']) ? $result['errors'] : array(),
            ]);

            return $result;
        }

        $cdekData = $result['data'];

        $deliveryMeta = is_array($order->delivery_meta) ? $order->delivery_meta : array();
        $deliveryMeta['cdek_response'] = $cdekData;

        $order->update([
            'status' => 'paid',
            'delivery_status' => 'created',
            'cdek_uuid' => $this->cdek->extractOrderUuid($cdekData),
            'cdek_number' => $this->cdek->extractCdekNumber($cdekData),
            'delivery_meta' => $deliveryMeta,
        ]);

        $pdfPath = null;

        try {
            $barcodeResult = $this->generateBarcodePdfBinary($order->fresh(), $this->cdek);

            if (empty($barcodeResult['success']) || empty($barcodeResult['data'])) {
                Log::warning('Barcode PDF was not generated after payment', [
                    'order_id' => $order->id,
                    'order_number' => $order->number,
                    'errors' => isset($barcodeResult['errors']) ? $barcodeResult['errors'] : array(),
                ]);

                return [
                    'success' => true,
                    'data' => $cdekData,
                    'barcode_generated' => false,
                ];
            }

            $dir = storage_path('app/tmp/barcodes');

            if (!is_dir($dir)) {
                mkdir($dir, 0775, true);
            }

            $pdfPath = $dir . '/barcode-order-' . $order->id . '-' . time() . '.pdf';

            if (file_put_contents($pdfPath, $barcodeResult['data']) === false) {
                throw new \RuntimeException('Не удалось сохранить PDF штрихкода во временный файл');
            }

            $sent = $this->notificationOrderService->send($order->fresh(), $pdfPath);

            if (!$sent) {
                Log::warning('Telegram notification was not sent after payment', [
                    'order_id' => $order->id,
                    'order_number' => $order->number,
                ]);

                return [
                    'success' => true,
                    'data' => $cdekData,
                    'barcode_generated' => true,
                    'telegram_sent' => false,
                ];
            }
        } catch (Throwable $e) {
            Log::error('Barcode/Telegram processing failed after payment', [
                'order_id' => $order->id,
                'order_number' => $order->number,
                'message' => $e->getMessage(),
            ]);

            return [
                'success' => true,
                'data' => $cdekData,
                'barcode_generated' => false,
            ];
        } finally {
            if ($pdfPath && is_file($pdfPath)) {
                @unlink($pdfPath);
            }
        }

        return [
            'success' => true,
            'data' => $cdekData,
            'barcode_generated' => true,
            'telegram_sent' => true,
        ];
    }

    protected function generateBarcodePdfBinary(Order $order, CdekService $cdek)
    {
        $deliveryMeta = is_array($order->delivery_meta) ? $order->delivery_meta : array();
        $barcodeUuid = data_get($deliveryMeta, 'barcode_uuid');

        if (!$barcodeUuid) {
            $barcodeOrders = $this->buildBarcodeOrdersPayload($order);

            if (!$barcodeOrders) {
                return [
                    'success' => false,
                    'errors' => array('Не удалось сформировать данные для печати штрихкода'),
                ];
            }

            $attempts = 5;
            $barcodeResult = null;

            sleep(5);

            for ($i = 0; $i < $attempts; $i++) {
                if ($i > 0) {
                    sleep(3);
                }

                $barcodeResult = $cdek->printBarcodes($barcodeOrders, 1, 'A6', 'RUS');

                if (!empty($barcodeResult['success'])) {
                    break;
                }
            }

            if (empty($barcodeResult['success'])) {
                Log::warning('CDEK printBarcodes failed after retries', [
                    'order_id' => $order->id,
                    'order_number' => $order->number,
                    'errors' => $barcodeResult['errors'] ?? array(),
                ]);

                return $barcodeResult ?: [
                    'success' => false,
                    'errors' => array('Не удалось сформировать штрихкод СДЭК'),
                ];
            }

            $barcodeUuid = data_get($barcodeResult, 'data.entity.uuid');

            if (!$barcodeUuid) {
                return [
                    'success' => false,
                    'errors' => array('СДЭК не вернул UUID штрихкода'),
                ];
            }

            $deliveryMeta['barcode_uuid'] = $barcodeUuid;
            $deliveryMeta['barcode_response'] = $barcodeResult['data'];

            $order->update([
                'delivery_meta' => $deliveryMeta,
            ]);
        }

        $downloadAttempts = 7;
        $result = null;

        for ($i = 0; $i < $downloadAttempts; $i++) {
            if ($i > 0) {
                sleep(2);
            }

            $result = $cdek->downloadBarcodePdf($barcodeUuid);

            if (!empty($result['success']) && !empty($result['data'])) {
                return $result;
            }
        }

        Log::warning('CDEK downloadBarcodePdf failed after retries', [
            'order_id' => $order->id,
            'order_number' => $order->number,
            'barcode_uuid' => $barcodeUuid,
            'errors' => $result['errors'] ?? array(),
        ]);

        return $result ?: [
            'success' => false,
            'errors' => array('Не удалось скачать PDF штрихкода'),
        ];
    }

    protected function buildCreateOrderPayload(Order $order, array $items)
    {
        $packagesItems = collect($items)->map(function ($item) {
            return [
                'name' => $item['name'] ?? '',
                'ware_key' => $item['sku'] ?? null,
                'payment' => [
                    'value' => (float)($item['payment_value'] ?? 0),
                ],
                'cost' => (float)($item['cost'] ?? 0),
                'weight' => (int)($item['weight'] ?? 0),
                'amount' => (int)(
                    $item['quantity'] ?? ($item['amount'] ?? 1)
                ),
            ];
        })->values()->all();

        $payload = [
            'type' => 1,
            'number' => $order->number,
            'tariff_code' => (int)$order->tariff_code,
            'comment' => 'Заказ с сайта',
            'recipient' => [
                'name' => $order->customer_name,
                'phones' => [
                    ['number' => $order->customer_phone],
                ],
                'email' => $order->customer_email,
            ],
            'from_location' => [
                'code' => (int)config('cdek.from_location_code'),
                'country_code' => 'RU',
            ],
            'packages' => [[
                'number' => '1',
                'weight' => (int)$order->package_weight,
                'length' => (int)$order->package_length,
                'width' => (int)$order->package_width,
                'height' => (int)$order->package_height,
                'items' => $packagesItems,
            ]],
        ];

        if ($order->delivery_mode === 'pickup') {
            $payload['delivery_point'] = $order->pickup_point_code;
        } else {
            $payload['to_location'] = [
                'code' => (int)$order->city_code,
                'country_code' => 'RU',
                'address' => trim(implode(', ', array_filter([
                    $order->street,
                    $order->house ? 'д. ' . $order->house : null,
                    $order->flat ? 'кв. ' . $order->flat : null,
                    $order->entrance ? 'подъезд ' . $order->entrance : null,
                    $order->floor ? 'этаж ' . $order->floor : null,
                ]))),
            ];
        }

        return $payload;
    }

    protected function buildBarcodeOrdersPayload(Order $order)
    {
        if (!empty($order->cdek_uuid)) {
            return [
                ['order_uuid' => $order->cdek_uuid],
            ];
        }

        if (!empty($order->cdek_number)) {
            return [
                ['cdek_number' => (int)$order->cdek_number],
            ];
        }

        return [];
    }
}
