<?php

namespace App\Services;

use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Log;
use Telegram;

class NotificationService
{
    private const ICON_SUCCESS = "✅";
    private const ICON_FAILURE = "❌";
    private const ICON_INFO = "⚠️";

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

    public function sendPurchaseNotification(string $courseName, string $userName, string $phone,
                                             string $email, float $amount, string $promoInfo = ''): bool
    {
        $chatId = $this->getChatId('sales_channel');

        if (!$chatId) {
            Log::warning("Telegram Chat ID 'sales_channel' not configured.");
            return false;
        }

        $message = sprintf(
            "%s %s оплатил(а) курс %s за %.2f р \n\n" .
            "Email: %s \n" .
            "Телефон: %s\n\n %s",
            self::ICON_SUCCESS,
            $userName,
            $courseName,
            $amount,
            $email,
            $phone,
            $promoInfo
        );

        return $this->sendToTelegram($chatId, $message);
    }

    public function sendPresentationNotification(string $userName, string $phone, string $email): bool
    {
        $chatId = $this->getChatId('presentation_channel');

        if (!$chatId) {
            Log::warning("Telegram Chat ID 'presentation_channel' not configured.");
            return false;
        }

        $message = sprintf(
            "%s %s оставил(а) заявку на получение презентации по пакету 'Макси' \n\n" .
            "Email: %s \n" .
            "Телефон: %s \n",
            self::ICON_INFO,
            $userName,
            $email,
            $phone
        );

        return $this->sendToTelegram($chatId, $message);
    }

    public function sendPaymentFailedNotification(string $courseName, string $userName, string $phone,
                                                  string $email, float $amount): bool
    {
        $chatId = $this->getChatId('not_sales_channel');

        if (!$chatId) {
            Log::warning("Telegram Chat ID 'not_sales_channel' not configured.");
            return false;
        }

        $message = sprintf(
            "%s У %s попытка оплаты за курс %s не удалась\n\n" .
            "Email: %s \n" .
            "Телефон: %s \n" ,
            self::ICON_FAILURE,
            $userName,
            $courseName,
            $email,
            $phone
        );

        return $this->sendToTelegram($chatId, $message);
    }
}
