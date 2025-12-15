<?php

namespace App\Telegram\Commands;

use Illuminate\Support\Facades\Log;
use Telegram\Bot\Commands\Command;
use Telegram;

class GetIdCommand extends Command
{
    protected $name = 'getChatId';
    protected $description = 'Отправляет информацию о ID чата в этот же чат.';

    /**
     * Метод, который будет вызван, когда пользователь вводит /getChatId.
     */
    public function handle()
    {
        $bot = Telegram::bot();

        $update = $this->getUpdate();
        $chat   = $update->getChat();

        $chatId   = $chat->getId();
        $message = "💬 Чат: {$chatId}";

        $bot->sendMessage([
            'chat_id'    => $chatId,
            'text'       => $message,
            'parse_mode' => 'Markdown',
        ]);
    }
}
