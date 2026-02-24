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

    private const PARSE_MODE = 'MarkdownV2';

    protected function getChatId(string $channelKey): ?string
    {
        return Config::get("bot_channels.{$channelKey}");
    }

    private function escapeMarkdownV2(string $text): string
    {
        return preg_replace('/([_*\\[\\]\\(\\)\\~`>#+\\-=.!|{}\/\\\\])/u', '\\\\$1', $text);
    }

    protected function sendToTelegram(string $chatId, string $message, string $parseMode = 'HTML'): bool
    {
        try {
            if ($parseMode === 'MarkdownV2') {
                $message = $this->escapeMarkdownV2($message);
            }

            Telegram::sendMessage([
                'chat_id' => $chatId,
                'text'    => $message,
                'parse_mode' => $parseMode,
            ]);
            return true;
        } catch (\Exception $e) {
            Log::error("Telegram SDK Error: " . $e->getMessage(), ['context' => 'NotificationService', 'message' => $message]);
            return false;
        }
    }

    protected function buildReferralMessage(?string $referralCode, ?string $referralName, ?string $referralTelegramUsername): string
    {
        if (!$referralCode) {
            return '';
        }

        $usernamePart = $referralTelegramUsername
            ? sprintf("[%s](https://t.me/%s)", $referralName, ltrim($referralTelegramUsername, '@'))
            : $referralName;

        if ($referralName) {
            return sprintf("Использован реф-код: %s от %s", $referralCode, $usernamePart);
        }

        return sprintf("Использован реф-код: %s", $referralCode);
    }

    public function sendPurchaseNotification(
        string $courseName,
        string $userName,
        string $phone,
        string $email,
        float $amount,
        ?string $promoInfo = null,
        ?string $referralCode = null,
        ?string $referralName = null,
        ?string $referralTelegramUsername = null
    ): bool
    {
        $chatId = $this->getChatId('sales_channel');

        if (!$chatId) {
            Log::warning("Telegram Chat ID 'sales_channel' not configured.");
            return false;
        }

        $referralMessagePart = $this->buildReferralMessage($referralCode, $referralName, $referralTelegramUsername);

        $message = sprintf(
            "%s %s оплатил(а) курс %s за %.2f р \n\n" .
            "Email: %s \n" .
            "Телефон: %s\n\n %s \n\n",
            self::ICON_SUCCESS,
            $userName,
            $courseName,
            $amount,
            $email,
            $phone,
            $promoInfo
        );

        if ($referralMessagePart) {
            $message .= $referralMessagePart;
        }

        return $this->sendToTelegram($chatId, $message, self::PARSE_MODE);
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

        return $this->sendToTelegram($chatId, $message, 'HTML');
    }

    public function sendPaymentFailedNotification(
        string $courseName,
        string $userName,
        string $phone,
        string $email,
        float $amount,
        ?string $promoInfo = null,
        ?string $referralCode = null,
        ?string $referralName = null,
        ?string $referralTelegramUsername = null
    ): bool
    {
        $chatId = $this->getChatId('not_sales_channel');

        if (!$chatId) {
            Log::warning("Telegram Chat ID 'not_sales_channel' not configured.");
            return false;
        }

        $referralMessagePart = $this->buildReferralMessage($referralCode, $referralName, $referralTelegramUsername);

        $message = sprintf(
            "%s У %s попытка оплаты за курс %s не удалась\n\n" .
            "Email: %s \n" .
            "Телефон: %s \n",
            self::ICON_FAILURE,
            $userName,
            $courseName,
            $email,
            $phone
        );

        if ($promoInfo) {
            $message .= "Промо-инфо: " . $promoInfo . "\n";
        }

        if ($referralMessagePart) {
            $message .= "\n" . $referralMessagePart;
        }

        return $this->sendToTelegram($chatId, $message, self::PARSE_MODE);
    }
}
