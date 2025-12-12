<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Telegram;

class TelegramController extends Controller
{
    public function handleWebhook(Request $request)
    {
        $telegramBot = Telegram::getFacadeRoot();
        $telegramBot->commandsHandler(true);

        return response('ok');
    }
}
