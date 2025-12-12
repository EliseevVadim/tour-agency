<?php

namespace App\Services;

use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Log;
use Telegram;

class NotificationService
{
    protected function getChannelChatId(string $channelKey): ?string
    {
        return Config::get("bot_channels.{$channelKey}");
    }

    public function sendPurchaseNotification(string $courseName, string $userName, float $amount): bool
    {
        $chatId = $this->getChannelChatId('sales_channel');

        if (!$chatId) {
            Log::warning("Не найден Chat ID для канала продаж.");
            return false;
        }

        $message = sprintf(
            "🚨 НОВАЯ ПОКУПКА 🚨\n\n" .
            "👤 Пользователь: %s\n" .
            "📚 Курс: %s\n" .
            "💰 Сумма: %.2f р",
            $userName,
            $courseName,
            $amount
        );

        try {
            Telegram::sendMessage([
                'chat_id' => $chatId,
                'text'    => $message,
            ]);
            return true;
        } catch (\Exception $e) {
            Log::error("Ошибка отправки уведомления о покупке (Irazasyed SDK): " . $e->getMessage());
            return false;
        }
    }

}
