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
