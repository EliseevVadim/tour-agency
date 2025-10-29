<?php

namespace App\Http\Controllers;

use ATehnix\VkClient\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ClipController extends Controller
{
    public function getClips()
    {
        $items = [];

        $api = new Client(5.199);
        $api->setDefaultToken(config('admin.vk_token'));
        $response = $api->request('stories.get', ['owner_id' => -221754888]);
        dd($response);
        if (!empty($response) && isset($response['response'])) {
            $responseData = $response['response'];
            if (isset($responseData['items'])) {
                $items = $responseData['items'];
                dd($items);
            } else {
                dd('Массив "items" не найден в ответе.');
            }
        }
    }
}
