<?php

namespace App\Http\Controllers;

use ATehnix\VkClient\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ClipController extends Controller
{

    public function getClips()
    {
        $cachedData = Cache::remember('rutube_clips_data', 3600, function () {
            $url = 'https://rutube.ru/api/video/person/37334628/?page=1&perPage=25&origin_type=rshorts';

            try {
                $response = Http::get($url);
                if (!$response->successful()) {
                    return null;
                }

                $fullData = $response->json();
                $videos = $fullData['results'] ?? [];
                $selectedVideos = [];

                foreach ($videos as $video) {
                    if (is_array($video)) {
                        $modifiedVideoUrl = str_replace("https://rutube.ru/video/", "https://rutube.ru/shorts/", $video['video_url'] ?? '');

                        $selectedVideos[] = [
                            'title' => $video['title'] ?? null,
                            'video_url' => $modifiedVideoUrl ?? null,
                            'thumbnail_url' => $video['thumbnail_url'] ?? null,
                        ];
                    }
                }

                return array_slice($selectedVideos, 0, 10);

            } catch (\Exception $e) {
                Log::error("Rutube API Error: " . $e->getMessage());
                return null;
            }
        });
        if ($cachedData === null) {
            return response()->json([], 503);
        }

        return response()->json($cachedData);
    }
}
