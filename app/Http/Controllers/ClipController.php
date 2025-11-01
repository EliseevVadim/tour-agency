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

      /*  $response = Http::withHeaders([
            'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        ])->get('https://api.vk.com/method/shortVideo.getOwnerVideos', [
            'owner_id' => -221754888,
            'access_token' => config('admin.vk_token'),
            'v' => config('admin.vk_version'),
        ]);

        $data = $response->json();

        // Проверяем наличие ошибок в ответе VK API
        if (isset($data['error'])) {
            return response()->json([
                'error' => 'Ошибка VK API: ' . $data['error']['error_msg']
            ], $response->status()); // Используем статус код ответа VK
        }

        dd($data);*/

        $api = new Client(config('admin.vk_version'));
        $api->setDefaultToken(config('admin.vk_token'));
        $response = $api->request('shortVideo.getOwnerVideos', ['owner_id' => -221754888, 'count' => 25]);
        if (!empty($response) && isset($response['response'])) {
            $responseData = $response['response'];
            if (isset($responseData['items'])) {
                $items = $responseData['items'];
            } else {
                dd('Массив "items" не найден в ответе.');
            }
        }
        $formattedItems = [];

        foreach ($items as $item) {
            $directUrl = $item['player'] ?? null;

            $imageUrl = null;
            if (isset($item['image']) && is_array($item['image'])) {
                if (isset($item['image'][6])) {
                    if (isset($item['image'][6]['url'])) {
                        $imageUrl = $item['image'][6]['url'];
                    }
                }
            }
            elseif (isset($item['thumbnail']) && is_string($item['thumbnail'])) {
                $imageUrl = $item['thumbnail'];
            }
            elseif (isset($item['preview']) && is_string($item['preview'])) {
                $imageUrl = $item['preview'];
            }
            $title = $item['title'] ?? null;

            if ($directUrl && $title) {
                $formattedItems[] = [
                    'direct_url' => $directUrl,
                    'image' => $imageUrl,
                    'title' => $title,
                ];
            }
        }

        return response()->json($formattedItems);
    }
}
