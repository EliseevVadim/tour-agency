<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Http\Requests\CdekCalculateOptionsRequest;
use App\Http\Requests\CdekCreateOrderRequest;
use App\Models\Order;
use App\Services\Cdek\CdekService;
use App\Services\Cdek\NotificationOrderService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Throwable;

class DeliveryController extends Controller
{
    public function getCities(Request $request): JsonResponse
    {
        $query = trim((string) $request->input('city', ''));

        if (mb_strlen($query, 'UTF-8') < 3) {
            return response()->json(['data' => []]);
        }

        $path = resource_path('js/client/modules/shop/data/cities.csv');

        if (!file_exists($path)) {
            return response()->json(['error' => 'CSV not found'], 404);
        }

        $handle = fopen($path, 'r');
        $header = fgetcsv($handle, 0, ',');

        if (!$header) {
            fclose($handle);

            return response()->json(['error' => 'Empty CSV'], 422);
        }

        $header = array_map(function ($item) {
            return trim($item, "\xEF\xBB\xBF");
        }, $header);

        $rows = [];

        while (($data = fgetcsv($handle, 0, ',')) !== false) {
            if (count($data) !== count($header)) {
                continue;
            }

            $row = array_combine($header, $data);
            $city = trim($row['city_name'] ?? '');

            if ($city === '') {
                continue;
            }

            if (mb_stripos($city, $query, 0, 'UTF-8') !== 0) {
                continue;
            }

            $rows[] = [
                'city_name' => $row['city_name'] ?? null,
                'uuid' => $row['uuid'] ?? null,
                'region' => $row['region'] ?? null,
                'code' => isset($row['code']) ? (int) $row['code'] : null,
            ];
        }

        fclose($handle);

        return response()->json(['data' => $rows]);
    }

    public function calculateOptions(CdekCalculateOptionsRequest $request, CdekService $cdek): JsonResponse
    {
        $basePayload = [
            'from_location' => [
                'code' => (int) config('cdek.from_location_code'),
            ],
            'to_location' => [
                'code' => (int) $request->input('to_location_code'),
            ],
            'packages' => [[
                'weight' => (int) $request->input('weight'),
                'length' => (int) $request->input('length'),
                'width' => (int) $request->input('width'),
                'height' => (int) $request->input('height'),
            ]],
        ];

        $doorTariffCode = (int) config('cdek.tariffs.door');
        $pickupTariffCode = (int) config('cdek.tariffs.pickup');

        $door = $cdek->calculateByTariff($basePayload, $doorTariffCode);
        $pickup = $cdek->calculateByTariff($basePayload, $pickupTariffCode);

        return response()->json([
            'success' => true,
            'data' => [
                'door' => $this->formatTariffOption($door, 'door', 'СДЭК (курьер)', $doorTariffCode),
                'pickup' => $this->formatTariffOption($pickup, 'pickup', 'СДЭК (ПВЗ)', $pickupTariffCode),
            ],
        ]);
    }

    public function deliveryPoints(Request $request, CdekService $cdek): JsonResponse
    {
        $validated = $request->validate([
            'city_code' => ['required', 'integer'],
        ]);

        $result = $cdek->getPickupOffices((int) $validated['city_code']);

        if (!$result['success']) {
            Log::warning('CDEK deliveryPoints failed', [
                'city_code' => $validated['city_code'],
                'errors' => $result['errors'] ?? [],
            ]);

            return response()->json($result, 422);
        }

        $points = collect($result['data'])->map(function ($point) {
            return [
                'code' => $point['code'] ?? null,
                'name' => $point['name'] ?? null,
                'address' => data_get($point, 'location.address'),
                'address_full' => data_get($point, 'location.address_full'),
                'work_time' => $point['work_time'] ?? null,
                'phones' => collect($point['phones'] ?? [])->pluck('number')->values()->all(),
                'latitude' => data_get($point, 'location.latitude'),
                'longitude' => data_get($point, 'location.longitude'),
            ];
        })->values();

        return response()->json([
            'success' => true,
            'data' => $points,
        ]);
    }

    public function barcodeStatus(Order $order, CdekService $cdek): JsonResponse
    {
        try {
            $orderInfoResult = $cdek->getOrderInfo($order->number);

            if (!$orderInfoResult['success']) {
                Log::warning('CDEK barcodeStatus orderInfo failed', [
                    'order_id' => $order->id,
                    'order_number' => $order->number,
                    'errors' => $orderInfoResult['errors'] ?? [],
                ]);

                return response()->json($orderInfoResult, 422);
            }

            $orderState = $cdek->extractOrderRequestState($orderInfoResult['data']);
            $deliveryMeta = is_array($order->delivery_meta) ? $order->delivery_meta : [];
            $barcodeUuid = data_get($deliveryMeta, 'barcode_uuid');

            if (!$barcodeUuid) {
                return response()->json([
                    'success' => true,
                    'order_state' => $orderState,
                    'barcode_uuid' => null,
                    'barcode_state' => null,
                    'should_retry' => $orderState !== 'SUCCESSFUL',
                    'should_regenerate' => $orderState === 'SUCCESSFUL',
                ]);
            }

            $barcodeInfoResult = $cdek->getBarcodeInfo($barcodeUuid);

            if (!$barcodeInfoResult['success']) {
                Log::warning('CDEK barcodeStatus getBarcodeInfo failed', [
                    'order_id' => $order->id,
                    'barcode_uuid' => $barcodeUuid,
                    'errors' => $barcodeInfoResult['errors'] ?? [],
                ]);

                return response()->json($barcodeInfoResult, 422);
            }

            $barcodeState = $cdek->extractPrintStatus($barcodeInfoResult['data']);

            return response()->json([
                'success' => true,
                'order_state' => $orderState,
                'barcode_uuid' => $barcodeUuid,
                'barcode_state' => $barcodeState,
                'should_retry' => $orderState !== 'SUCCESSFUL' || in_array($barcodeState, ['ACCEPTED', 'PROCESSING'], true),
                'should_regenerate' => $barcodeState === 'REMOVED',
            ]);
        } catch (Throwable $e) {
            Log::error('CDEK barcodeStatus exception', [
                'order_id' => $order->id,
                'message' => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'errors' => [$e->getMessage()],
                'data' => null,
            ], 500);
        }
    }

    public function generateBarcode(Order $order, CdekService $cdek): JsonResponse
    {
        try {
            $orderInfoResult = $cdek->getOrderInfo($order->number);

            if (!$orderInfoResult['success']) {
                Log::warning('CDEK generateBarcode orderInfo failed', [
                    'order_id' => $order->id,
                    'order_number' => $order->number,
                    'errors' => $orderInfoResult['errors'] ?? [],
                ]);

                return response()->json($orderInfoResult, 422);
            }

            $orderState = $cdek->extractOrderRequestState($orderInfoResult['data']);

            if ($orderState !== 'SUCCESSFUL') {
                return response()->json([
                    'success' => false,
                    'errors' => ['Заказ в СДЭК ещё не готов для печати штрихкода'],
                    'order_state' => $orderState,
                    'should_retry' => true,
                ], 409);
            }

            $deliveryMeta = is_array($order->delivery_meta) ? $order->delivery_meta : [];
            $barcodeUuid = data_get($deliveryMeta, 'barcode_uuid');

            if ($barcodeUuid) {
                $barcodeInfoResult = $cdek->getBarcodeInfo($barcodeUuid);

                if ($barcodeInfoResult['success']) {
                    $barcodeState = $cdek->extractPrintStatus($barcodeInfoResult['data']);

                    if ($barcodeState !== 'REMOVED') {
                        return response()->json([
                            'success' => true,
                            'barcode_uuid' => $barcodeUuid,
                            'barcode_state' => $barcodeState,
                            'should_retry' => in_array($barcodeState, ['ACCEPTED', 'PROCESSING'], true),
                        ]);
                    }
                }

                unset($deliveryMeta['barcode_uuid'], $deliveryMeta['barcode_response']);
                $order->update(['delivery_meta' => $deliveryMeta]);
            }

            $barcodeOrders = $this->buildBarcodeOrdersPayload($order);

            if (!$barcodeOrders) {
                Log::warning('CDEK generateBarcode no order identifiers', [
                    'order_id' => $order->id,
                    'order_number' => $order->number,
                    'cdek_uuid' => $order->cdek_uuid,
                    'cdek_number' => $order->cdek_number,
                ]);

                return response()->json([
                    'success' => false,
                    'errors' => ['Для формирования штрихкода отсутствует cdek_uuid и cdek_number'],
                ], 422);
            }

            $barcodeResult = $cdek->printBarcodes($barcodeOrders, 1, 'A6', 'RUS');

            if (!$barcodeResult['success']) {
                Log::warning('CDEK generateBarcode print failed', [
                    'order_id' => $order->id,
                    'errors' => $barcodeResult['errors'] ?? [],
                ]);

                return response()->json($barcodeResult, 422);
            }

            $barcodeData = $barcodeResult['data'];
            $barcodeUuid = data_get($barcodeData, 'entity.uuid');

            $deliveryMeta = is_array($order->delivery_meta) ? $order->delivery_meta : [];
            $deliveryMeta['barcode_uuid'] = $barcodeUuid;
            $deliveryMeta['barcode_response'] = $barcodeData;

            $order->update(['delivery_meta' => $deliveryMeta]);

            return response()->json([
                'success' => true,
                'barcode_uuid' => $barcodeUuid,
                'barcode_state' => data_get($barcodeData, 'requests.0.state'),
                'should_retry' => true,
            ]);
        } catch (Throwable $e) {
            Log::error('CDEK generateBarcode exception', [
                'order_id' => $order->id,
                'message' => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'errors' => [$e->getMessage()],
                'data' => null,
            ], 500);
        }
    }

    public function downloadBarcode(Order $order, CdekService $cdek)
    {
        try {
            $result = $this->generateBarcodePdfBinary($order, $cdek);

            if (!$result['success']) {
                $status = !empty($result['should_retry']) ? 409 : 422;

                return response()->json($result, $status);
            }

            return response($result['data'], 200, [
                'Content-Type' => $result['content_type'] ?: 'application/pdf',
                'Content-Disposition' => 'inline; filename="barcode-' . $order->number . '.pdf"',
            ]);
        } catch (Throwable $e) {
            Log::error('CDEK downloadBarcode exception', [
                'order_id' => $order->id,
                'message' => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'errors' => [$e->getMessage()],
            ], 500);
        }
    }

    public function sendOrderToTelegram(
        Order $order,
        CdekService $cdek,
        NotificationOrderService $notificationOrderService
    ): JsonResponse {
        $pdfPath = null;

        try {
            $result = $this->generateBarcodePdfBinary($order, $cdek);

            if (!$result['success']) {
                $status = !empty($result['should_retry']) ? 409 : 422;

                return response()->json($result, $status);
            }

            $dir = storage_path('app/tmp/barcodes');

            if (!is_dir($dir)) {
                mkdir($dir, 0775, true);
            }

            $pdfPath = $dir . '/barcode-order-' . $order->id . '-' . time() . '.pdf';

            file_put_contents($pdfPath, $result['data']);

            $sent = $notificationOrderService->send($order, $pdfPath);

            if (!$sent) {
                return response()->json([
                    'success' => false,
                    'message' => 'Не удалось отправить уведомление в Telegram',
                ], 500);
            }

            return response()->json([
                'success' => true,
                'message' => 'Уведомление отправлено',
            ]);
        } catch (Throwable $e) {
            Log::error('Ошибка отправки заказа в Telegram: ' . $e->getMessage(), [
                'order_id' => $order->id,
            ]);

            return response()->json([
                'success' => false,
                'errors' => [$e->getMessage()],
            ], 500);
        } finally {
            if ($pdfPath && is_file($pdfPath)) {
                @unlink($pdfPath);
            }
        }
    }

    private function generateBarcodePdfBinary(Order $order, CdekService $cdek): array
    {
        $deliveryMeta = is_array($order->delivery_meta) ? $order->delivery_meta : [];
        $barcodeUuid = data_get($deliveryMeta, 'barcode_uuid');

        if (!$barcodeUuid) {
            $orderInfoResult = $cdek->getOrderInfo($order->number);

            if (!$orderInfoResult['success']) {
                Log::warning('CDEK generateBarcodePdfBinary orderInfo failed', [
                    'order_id' => $order->id,
                    'order_number' => $order->number,
                    'errors' => $orderInfoResult['errors'] ?? [],
                ]);

                return $orderInfoResult;
            }

            $orderState = $cdek->extractOrderRequestState($orderInfoResult['data']);

            if ($orderState !== 'SUCCESSFUL') {
                return [
                    'success' => false,
                    'errors' => ['Заказ в СДЭК ещё не готов для печати штрихкода'],
                    'order_state' => $orderState,
                    'should_retry' => true,
                ];
            }

            $barcodeOrders = $this->buildBarcodeOrdersPayload($order);

            if (!$barcodeOrders) {
                Log::warning('CDEK generateBarcodePdfBinary no order identifiers', [
                    'order_id' => $order->id,
                    'order_number' => $order->number,
                ]);

                return [
                    'success' => false,
                    'errors' => ['UUID штрихкода не найден и не удалось сформировать новый'],
                ];
            }

            $barcodeResult = $cdek->printBarcodes($barcodeOrders, 1, 'A6', 'RUS');

            if (!$barcodeResult['success']) {
                Log::warning('CDEK generateBarcodePdfBinary auto-generate failed', [
                    'order_id' => $order->id,
                    'errors' => $barcodeResult['errors'] ?? [],
                ]);

                return $barcodeResult;
            }

            $barcodeUuid = data_get($barcodeResult, 'data.entity.uuid');

            if (!$barcodeUuid) {
                Log::warning('CDEK generateBarcodePdfBinary empty barcode uuid after generate', [
                    'order_id' => $order->id,
                ]);

                return [
                    'success' => false,
                    'errors' => ['СДЭК не вернул UUID нового штрихкода'],
                ];
            }

            $deliveryMeta['barcode_uuid'] = $barcodeUuid;
            $deliveryMeta['barcode_response'] = $barcodeResult['data'];

            $order->update([
                'delivery_meta' => $deliveryMeta,
            ]);
        }

        $barcodeInfoResult = $cdek->getBarcodeInfo($barcodeUuid);

        if (!$barcodeInfoResult['success']) {
            Log::warning('CDEK generateBarcodePdfBinary getBarcodeInfo failed', [
                'order_id' => $order->id,
                'barcode_uuid' => $barcodeUuid,
                'errors' => $barcodeInfoResult['errors'] ?? [],
            ]);

            return $barcodeInfoResult;
        }

        $result = $cdek->downloadBarcodePdf($barcodeUuid);

        if (!$result['success']) {
            Log::warning('CDEK generateBarcodePdfBinary pdf failed', [
                'order_id' => $order->id,
                'barcode_uuid' => $barcodeUuid,
                'errors' => $result['errors'] ?? [],
            ]);

            return $result;
        }

        return $result;
    }

    private function buildCreateOrderPayload(Order $order, array $items): array
    {
        $packagesItems = collect($items)->map(function ($item) {
            return [
                'name' => $item['name'] ?? '',
                'ware_key' => $item['sku'] ?? null,
                'payment' => [
                    'value' => (float) ($item['payment_value'] ?? 0),
                ],
                'cost' => (float) ($item['cost'] ?? 0),
                'weight' => (int) ($item['weight'] ?? 0),
                'amount' => (int) ($item['quantity'] ?? $item['amount'] ?? 1),
            ];
        })->values()->all();

        $payload = [
            'type' => 1,
            'number' => $order->number,
            'tariff_code' => (int) $order->tariff_code,
            'comment' => 'Заказ с сайта',
            'recipient' => [
                'name' => $order->customer_name,
                'phones' => [
                    ['number' => $order->customer_phone],
                ],
                'email' => $order->customer_email,
            ],
            'from_location' => [
                'code' => (int) config('cdek.from_location_code'),
                'country_code' => 'RU',
            ],
            'packages' => [[
                'number' => '1',
                'weight' => (int) $order->package_weight,
                'length' => (int) $order->package_length,
                'width' => (int) $order->package_width,
                'height' => (int) $order->package_height,
                'items' => $packagesItems,
            ]],
        ];

        if ($order->delivery_mode === 'pickup') {
            $payload['delivery_point'] = $order->pickup_point_code;
        } else {
            $payload['to_location'] = [
                'code' => (int) $order->city_code,
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

    private function buildBarcodeOrdersPayload(Order $order): array
    {
        if (!empty($order->cdek_uuid)) {
            return [
                ['order_uuid' => $order->cdek_uuid],
            ];
        }

        if (!empty($order->cdek_number)) {
            return [
                ['cdek_number' => (int) $order->cdek_number],
            ];
        }

        return [];
    }

    private function formatTariffOption(array $result, string $type, string $title, int $tariffCode): ?array
    {
        if (!$result['success'] || empty($result['data'])) {
            return null;
        }

        $data = $result['data'];

        $periodMin = (int) ($data['period_min'] ?? 0);
        $periodMax = (int) ($data['period_max'] ?? 0);

        if ($periodMin === 0) {
            $periodMin = 1;
        }

        if ($periodMax === 0) {
            $periodMax = 1;
        }

        return [
            'type' => $type,
            'title' => $title,
            'tariff_code' => $tariffCode,
            'price' => (float) ($data['total_sum'] ?? $data['delivery_sum'] ?? 0),
            'period_min' => $periodMin,
            'period_max' => $periodMax,
        ];
    }
}
