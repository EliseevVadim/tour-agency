<?php

namespace App\Services;

use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Log;
use Telegram; // Предполагаем, что это Telegram-SDK фасад

class NotificationService
{
    // Константы для стилизации сообщений
    private const ICON_SUCCESS = "✅";
    private const ICON_FAILURE = "❌";
    private const ICON_INFO = "ℹ️"; // Можно использовать для других статусов

    protected function getChatId(string $channelKey): ?string
    {
        return Config::get("bot_channels.{$channelKey}");
    }

    /**
     * Приватный метод для отправки сообщения через SDK
     */
    protected function sendToTelegram(string $chatId, string $message): bool
    {
        try {
            Telegram::sendMessage([
                'chat_id' => $chatId,
                'text'    => $message,
            ]);
            return true;
        } catch (\Exception $e) {
            Log::error("Telegram SDK Error: " . $e->getMessage(), ['context' => 'NotificationService']);
            return false;
        }
    }

    public function sendPurchaseNotification(string $courseName, string $userName, float $amount): bool
    {
        $chatId = $this->getChatId('sales_channel');

        if (!$chatId) {
            Log::warning("Telegram Chat ID 'sales_channel' not configured.");
            return false;
        }

        $message = sprintf(
            "%s НОВАЯ ПОКУПКА\n\n" .
            "👤 Пользователь: %s\n" .
            "📚 Курс: %s\n" .
            "💰 Сумма: %.2f р",
            self::ICON_SUCCESS,
            $userName,
            $courseName,
            $amount
        );

        return $this->sendToTelegram($chatId, $message);
    }

    public function sendPaymentFailedNotification(string $courseName, string $userName, float $amount): bool
    {
        $chatId = $this->getChatId('not_sales_channel');

        if (!$chatId) {
            Log::warning("Telegram Chat ID 'not_sales_channel' not configured.");
            return false;
        }

        $message = sprintf(
            "%s ПОПЫТКА ОПЛАТЫ НЕ УДАЛАСЬ\n\n" .
            "👤 Пользователь: %s\n" .
            "📚 Курс: %s\n" .
            "💰 Сумма: %.2f р",
            self::ICON_FAILURE,
            $userName,
            $courseName,
            $amount
        );

        return $this->sendToTelegram($chatId, $message);
    }
}
