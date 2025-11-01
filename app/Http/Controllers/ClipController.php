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
        $url = 'https://rutube.ru/api/video/person/37334628/?page=1&perPage=25&origin_type=rshorts';

        try {
            $response = Http::get($url);
            if ($response->successful()) {
                $fullData = $response->json();

                $videos = $fullData['results'] ?? [];

                $selectedVideos = [];
                foreach ($videos as $video) {
                    if (is_array($video)) {
                        $modifiedVideoUrl = str_replace("https://rutube.ru/video/", "https://rutube.ru/shorts/", $video['video_url']);

                        $selectedVideos[] = [
                            'title' => $video['title'] ?? null,
                            'video_url' => $modifiedVideoUrl ?? null,
                            'thumbnail_url' => $video['thumbnail_url'] ?? null,
                        ];
                    }
                }
                return response()->json($selectedVideos);
            } else {
                $statusCode = $response->status();
                $errorBody = $response->body();
                return response()->json([
                    'error' => 'Request failed',
                    'status_code' => $statusCode,
                    'message' => $errorBody
                ], $statusCode);
            }
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'An exception occurred',
                'message' => $e->getMessage()
            ], 500);
        }
      /*  $items = [];
        $api = new Client(config('admin.vk_version'));
        $api->setDefaultToken(config('admin.vk_token'));
        $response = $api->request('video.get', ['owner_id' => -223232323]);
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
            } elseif (isset($item['thumbnail']) && is_string($item['thumbnail'])) {
                $imageUrl = $item['thumbnail'];
            } elseif (isset($item['preview']) && is_string($item['preview'])) {
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

        return response()->json($formattedItems);*/
    }
}
