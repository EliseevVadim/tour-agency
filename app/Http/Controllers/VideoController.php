<?php

namespace App\Http\Controllers;

use ATehnix\VkClient\Client;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Log;

class VideoController extends Controller
{
    public function getVideos(): JsonResponse
    {
        $formattedItems = [];
        $ownerId = config('admin.vk_api.owner_id', -221754888);
        $count = 20;

        try {
            $api = new Client(config('admin.vk_version'));
            $api->setDefaultToken(config('admin.vk_token'));

            $response = $api->request('video.get', [
                'owner_id' => $ownerId,
                'count' => $count
            ]);

            if (empty($response['response']['items'])) {
                return response()->json([]);
            }

            $items = $response['response']['items'];

            foreach ($items as $item) {
                if (!isset($item['direct_url'], $item['title'])) {
                    continue;
                }

                $imageUrl = $item['image'][6]['url'] ?? $item['thumbnail'] ?? $item['preview'] ?? null;

                if ($imageUrl) {
                    $formattedItems[] = [
                        'direct_url' => $item['direct_url'],
                        'image' => $imageUrl,
                        'title' => $item['title'],
                        'id' => $item['id'],
                    ];
                }
            }

            return response()->json($formattedItems);

        } catch (\Exception $e) {
            Log::error("VK Video API Error: " . $e->getMessage());
            return response()->json([]);
        }
    }
}
