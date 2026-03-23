<?php

namespace App\Services\Cdek;

use App\Models\Order;
use App\Models\ProductAttribute;
use App\Models\ShopPromoCode;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Log;
use Telegram;
use Throwable;

class NotificationOrderService
{
    const PARSE_MODE_MARKDOWN = 'Markdown';
    const TELEGRAM_TEXT_LIMIT = 4000;

    public function send(Order $order, ?string $pdfPath = null): bool
    {
        $chatId = $this->getChatId('cdek_order_channel');

        if (!$chatId) {
            Log::warning("Telegram Chat ID 'cdek_order_channel' not configured.");
            return false;
        }

        $message = $this->buildOrderTelegramMessage($order);
        $sent = $this->sendLongTelegramMessage($chatId, $message, self::PARSE_MODE_MARKDOWN);

        if (!$sent) {
            return false;
        }

        if ($pdfPath && is_file($pdfPath) && is_readable($pdfPath)) {
            $this->sendDocumentToTelegram(
                $chatId,
                $pdfPath,
                'Транспортные документы по заказу ' . $order->number,
                'delivery-documents-' . (string) $order->number . '.pdf'
            );
        }

        return true;
    }

    protected function getChatId(string $channelKey): ?string
    {
        return Config::get("bot_channels.{$channelKey}");
    }

    protected function buildOrderTelegramMessage(Order $order): string
    {
        $adminUrl = url('/admin/orders?order=' . $order->id);
        $documentsUrl = url('/api/delivery/orders/' . $order->id . '/download-barcode');
        $attributeLabels = $this->getAttributeLabelsByProduct((array) $order->items);

        $lines = [];
        $lines[] = '📦 *Заказ:* `' . $this->escapeCode((string) $order->number) . '`';
        $lines[] = '🔗 *Админка:* ' . $adminUrl;
        $lines[] = '📌 *Статус:* ' . 'Оплачен';
        $lines[] = '👤 *Заказчик:* ' . $order->customer_name;
        $lines[] = '📞 *Телефон:* `' . $this->escapeCode((string) $order->customer_phone) . '`';
        $lines[] = '✉️ *Email:* `' . $this->escapeCode((string) $order->customer_email) . '`';
        $lines[] = '🚚 *Служба доставки:* ' . $this->resolveDeliveryType($order);
        $lines[] = '📍 *Адрес доставки:* ' . $this->resolveDeliveryAddress($order);
        $lines[] = '💳 *Платеж:* `' . $order->payment_method . '`';
        $lines[] = '';
        $lines[] = '🧾 *Позиции по заказу:*';

        foreach ((array) $order->items as $item) {
            $lines[] = $this->formatTelegramOrderItem((array) $item, $attributeLabels);
            $lines[] = '';
        }

        $lines[] = '';
        if ($order->promo_code_id) {
            $promoCode = ShopPromoCode::query()->find($order->promo_code_id);

            if ($promoCode && $promoCode->discount_percent) {
                $lines[] = '🏷 *Промокод применён (' . $promoCode->discount_percent . '%)*';
            }

            $lines[] = '';
        }

        $lines[] = '🚛 *Стоимость доставки:* ' . $this->formatMoney($order->delivery_price);
        $lines[] = '💰 *Полная стоимость заказа:* ' . $this->formatMoney($order->items_price);
        $lines[] = '📂 *Детали заказа:* ' . $adminUrl;
        $lines[] = '📎 *Транспортные документы:* ' . $documentsUrl;

        return implode("\n", $lines);
    }

    protected function getAttributeLabelsByProduct(array $items): array
    {
        $productIds = [];

        foreach ($items as $item) {
            if (!is_array($item)) {
                continue;
            }

            if (!empty($item['product_id'])) {
                $productIds[] = (int) $item['product_id'];
            }
        }

        $productIds = array_values(array_unique(array_filter($productIds)));

        if (empty($productIds)) {
            return [];
        }

        $rows = ProductAttribute::query()
            ->whereIn('product_id', $productIds)
            ->get(['product_id', 'sku_key', 'name']);

        $labels = [];

        foreach ($rows as $row) {
            if (!isset($labels[$row->product_id])) {
                $labels[$row->product_id] = [];
            }

            $labels[$row->product_id][$row->sku_key] = $row->name;
        }

        return $labels;
    }

    protected function formatTelegramOrderItem(array $item, array $attributeLabels = []): string
    {
        $reservedKeys = [
            'id',
            'product_id',
            'sku',
            'name',
            'product_name',
            'qty',
            'quantity',
            'price',
            'cost',
            'old_price',
            'amount',
            'payment_value',
            'weight',
            'length',
            'width',
            'height',
            'stock_qty',
            'images',
            'description',
            'category_slug',
            'attributes',
            'attribute_names',
        ];

        $productId = isset($item['product_id']) ? (int) $item['product_id'] : 0;
        $labels = $attributeLabels[$productId] ?? [];

        if (!empty($item['attribute_names']) && is_array($item['attribute_names'])) {
            $labels = array_merge($labels, $item['attribute_names']);
        }

        $sku = isset($item['sku']) ? (string) $item['sku'] : '—';
        $name = isset($item['name']) ? (string) $item['name'] : (isset($item['product_name']) ? (string) $item['product_name'] : '—');
        $qty = (string) ($item['quantity'] ?? $item['amount'] ?? 1);
        $price = $this->formatMoney($item['price'] ?? $item['cost'] ?? 0);
        $weight = isset($item['weight']) ? (string) $item['weight'] : '0';

        $parts = [];
        $parts[] = '• *' . $name . '*';
        $parts[] = '  SKU: `' . $this->escapeCode($sku) . '`';

        foreach ($item as $key => $value) {
            if (in_array($key, $reservedKeys, true)) {
                continue;
            }

            if ($value === null || $value === '' || is_array($value) || is_object($value)) {
                continue;
            }

            $label = $labels[$key] ?? $this->humanizeKey((string)$key);

            $parts[] = '  ' . $label . ': `' . $this->escapeCode((string) $value) . '`';
        }

        $parts[] = '  Количество: `' . $this->escapeCode($qty) . '`';
        $parts[] = '  Цена: *' . $price . '*';
        $parts[] = '  Вес: `' . $this->escapeCode($weight) . '`';

        return implode("\n", $parts);
    }

    protected function resolveDeliveryType(Order $order): string
    {
        $map = [
            'pickup' => 'СДЭК (ПВЗ)',
            'door' => 'СДЭК (Курьер)',
        ];

        return isset($map[$order->delivery_mode]) ? $map[$order->delivery_mode] : (string) $order->delivery_mode;
    }

    protected function resolveDeliveryAddress(Order $order): string
    {
        $parts = [];

        if ($order->city) {
            $parts[] = 'Нас. пункт: ' . $order->city;
        }

        if ($order->pickup_point_code) {
            $parts[] = 'Пункт выдачи: ' . $order->pickup_point_code;
        }

        if ($order->pickup_point_address) {
            $parts[] = 'Адрес ПВЗ: ' . $order->pickup_point_address;
        }

        $addressParts = array_filter([
            $order->street ? 'ул. ' . $order->street : null,
            $order->house ? 'д. ' . $order->house : null,
            $order->flat ? 'кв. ' . $order->flat : null,
            $order->entrance ? 'под. ' . $order->entrance : null,
            $order->floor ? 'эт. ' . $order->floor : null,
        ]);

        if (!empty($addressParts)) {
            $parts[] = 'Адрес: ' . implode(', ', $addressParts);
        }

        return !empty($parts) ? implode(', ', $parts) : '—';
    }

    protected function humanizeKey(string $key): string
    {
        $key = str_replace('_', ' ', $key);

        return mb_convert_case($key, MB_CASE_TITLE, 'UTF-8');
    }

    protected function formatMoney($value): string
    {
        if ($value === null || $value === '') {
            return '0,00 р.';
        }

        return number_format((float) $value, 2, ',', ' ') . ' р.';
    }

    protected function sendLongTelegramMessage(string $chatId, string $message, string $parseMode = self::PARSE_MODE_MARKDOWN): bool
    {
        $chunks = $this->splitMessage($message, self::TELEGRAM_TEXT_LIMIT);

        foreach ($chunks as $chunk) {
            $sent = $this->sendToTelegram($chatId, $chunk, $parseMode);

            if (!$sent) {
                return false;
            }
        }

        return true;
    }

    protected function splitMessage(string $message, int $limit = self::TELEGRAM_TEXT_LIMIT): array
    {
        $message = trim($message);

        if (mb_strlen($message, 'UTF-8') <= $limit) {
            return [$message];
        }

        $parts = [];
        $rest = $message;

        while (mb_strlen($rest, 'UTF-8') > $limit) {
            $chunk = mb_substr($rest, 0, $limit, 'UTF-8');
            $splitPos = mb_strrpos($chunk, "\n", 0, 'UTF-8');

            if ($splitPos === false || $splitPos < (int) ($limit * 0.5)) {
                $splitPos = $limit;
            }

            $parts[] = trim(mb_substr($rest, 0, $splitPos, 'UTF-8'));
            $rest = trim(mb_substr($rest, $splitPos, null, 'UTF-8'));
        }

        if ($rest !== '') {
            $parts[] = $rest;
        }

        return $parts;
    }

    protected function sendToTelegram(string $chatId, string $message, string $parseMode = self::PARSE_MODE_MARKDOWN): bool
    {
        try {
            Telegram::sendMessage([
                'chat_id' => $chatId,
                'text' => $message,
                'parse_mode' => $parseMode,
                'disable_web_page_preview' => true,
            ]);

            return true;
        } catch (Throwable $e) {
            Log::error('Telegram sendMessage error: ' . $e->getMessage(), [
                'context' => 'NotificationOrderService',
                'message' => $message,
            ]);

            return false;
        }
    }

    protected function sendDocumentToTelegram(
        string $chatId,
        string $filePath,
        ?string $caption = null,
        ?string $filename = null
    ): bool {
        try {
            if (!is_file($filePath) || !is_readable($filePath)) {
                Log::error('Telegram document file not found or not readable', [
                    'context' => 'NotificationOrderService',
                    'file_path' => $filePath,
                ]);

                return false;
            }

            $payload = [
                'chat_id' => $chatId,
                'document' => fopen($filePath, 'rb'),
            ];

            if ($caption !== null && $caption !== '') {
                $payload['caption'] = $caption;
                $payload['parse_mode'] = self::PARSE_MODE_MARKDOWN;
            }

            if ($filename) {
                $payload['filename'] = $filename;
            }

            Telegram::sendDocument($payload);

            return true;
        } catch (Throwable $e) {
            Log::error('Telegram sendDocument error: ' . $e->getMessage(), [
                'context' => 'NotificationOrderService',
                'file_path' => $filePath,
            ]);

            return false;
        }
    }

    protected function escapeCode(string $text): string
    {
        return str_replace('`', '\`', $text);
    }

    public function sendBackInStockRequest(array $data): bool
    {
        $chatId = $this->getChatId('cdek_order_channel');

        if (!$chatId) {
            Log::warning("Telegram Chat ID 'cdek_order_channel' not configured.");
            return false;
        }

        $requestId = isset($data['id']) ? (string) $data['id'] : '—';
        $productId = isset($data['product_id']) ? (int) $data['product_id'] : 0;
        $sku = isset($data['sku']) && $data['sku'] !== '' ? (string) $data['sku'] : '—';
        $name = isset($data['name']) && $data['name'] !== '' ? (string) $data['name'] : 'Товар';
        $phone = isset($data['phone']) && $data['phone'] !== '' ? (string) $data['phone'] : 'Не указан';
        $email = isset($data['email']) && $data['email'] !== '' ? (string) $data['email'] : 'Не указан';

        $productUrl = $productId ? url('/shop?product=' . $productId) : null;
        $attributesText = $this->formatBackInStockAttributes($data);

        $lines = [];
        $lines[] = '🔔 *Заявка на поступление товара*';
        $lines[] = '🆔 *Запрос:* #' . $requestId;
        $lines[] = '📦 *Товар:* ' . $name;

        if ($productUrl) {
            $lines[] = '🔗 *Ссылка на товар:* ' . $productUrl;
        }

        $lines[] = '🏷 *Артикул:* `' . $this->escapeCode($sku) . '`';

        if ($attributesText !== '') {
            $lines[] = '🧾 *Параметры:* ' . $attributesText;
        }

        $lines[] = '📞 *Телефон:* `' . $this->escapeCode($phone) . '`';
        $lines[] = '✉️ *Email:* `' . $this->escapeCode($email) . '`';

        $message = implode("\n", $lines);

        return $this->sendLongTelegramMessage($chatId, $message, self::PARSE_MODE_MARKDOWN);
    }

    protected function formatBackInStockAttributes(array $data): string
    {
        $reservedKeys = [
            'id',
            'product_id',
            'sku',
            'name',
            'customer_name',
            'phone',
            'email',
            'created_at',
            'updated_at',
            'attribute_names',
        ];

        $labels = [];

        if (!empty($data['attribute_names']) && is_array($data['attribute_names'])) {
            $labels = $data['attribute_names'];
        }

        $parts = [];

        foreach ($data as $key => $value) {
            if (in_array($key, $reservedKeys, true)) {
                continue;
            }

            if ($value === null || $value === '' || is_array($value) || is_object($value)) {
                continue;
            }

            $label = $labels[$key] ?? $this->humanizeKey((string)$key);
            $parts[] = $label . ': `' . $this->escapeCode((string) $value) . '`';
        }

        return implode(', ', $parts);
    }
}
