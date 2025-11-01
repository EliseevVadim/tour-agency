<?php

namespace App\Http\Controllers;

use ATehnix\VkClient\Client;

class VideoController extends Controller
{
    public function getVideos()
    {
        $items = [];

        $api = new Client(config('admin.vk_version'));
        $api->setDefaultToken(config('admin.vk_token'));
        $response = $api->request('video.get', ['owner_id' => -221754888, 'count' => 20]);
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
            $directUrl = $item['direct_url'] ?? null;

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
