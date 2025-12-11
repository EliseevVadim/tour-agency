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
    }
}
