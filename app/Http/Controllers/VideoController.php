<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class VideoController extends Controller
{
    public function index()
    {
        $filePath = storage_path('app/videos.json');

        if (!File::exists($filePath)) {
            $this->initializeJsonFile();
            return view('admin.videos');
        }

        return view('admin.videos');
    }

    public function initializeJsonFile()
    {
        $filePath = storage_path('app/videos.json');

        if (File::exists($filePath)) {
            return redirect()->route('videos.index');
        }

        $initialData = [
            [
                "id" => 1,
                "video_url" => "https://vk.com/put_club?from=search&z=video-221754888_456244021%2Fvideos-221754888%2Fpl_-221754888_-2",
                "thumbnail_url" => "https://sun9-23.userapi.com/impg/xvDRPQn_quVE_WsnVqqKh5952UdU0jkneCYrLw/7iFWaSNjU6I.jpg?quality=90&proxy=1&sign=b4621a2d83bde55b1a9846d85277a0c0&c_uniq_tag=1XrFLwkw8PuqsxmhT8ONzUzzliPxvLbLOLEY8r9WQUI&type=video_thumb"
            ],
            [
                "id" => 2,
                "video_url" => "https://vk.com/put_club?from=search&z=video-221754888_456244007%2Fpl_-221754888_-2",
                "thumbnail_url" => "https://sun9-69.userapi.com/impg/N-rTmYlOFaWJxYOV3w4Y3u8BJtNQW5EIu0ibuA/lbvDxbozHeQ.jpg?quality=90&proxy=1&sign=a362f72faa968b7727e2ef0ba7c1594b&c_uniq_tag=gZQbY9qsZ_P4EjwJ8iH-m5O5w8FQQay-WBHzsaeyar4&type=video_thumb"
            ],
            [
                "id" => 3,
                "video_url" => "https://vk.com/put_club?from=search&z=video-221754888_456243839%2Fpl_-221754888_-2",
                "thumbnail_url" => "https://sun9-60.userapi.com/impg/AkHtD1LQ1t02mTPc9_AKTnEsP6KC_6oJoNW6dg/rH2Nutz139M.jpg?quality=90&proxy=1&sign=a89f776e0121b7e4096ea8660bc1c1ac&c_uniq_tag=Lz50vtxd8g4f2BbPk9GbB9BLimNPyWt6jQ9rGZgnuuE&type=video_thumb"
            ]
        ];

        File::put($filePath, json_encode($initialData, JSON_PRETTY_PRINT));

        return "Файл videos.json успешно создан!";
    }

    public function getVideos()
    {
        $videos = json_decode(File::get(storage_path('app/videos.json')), true);
        return response()->json($videos);
    }

    public function store(Request $request)
    {
        $inputVideoUrl = $request->input('video_url');

        if ($inputVideoUrl === null) {
            return response()->json(['error' => 'The "video_url" field is required.'], 422);
        }

        $videoUrl = $inputVideoUrl;

        $videosPath = storage_path('app/videos.json');
        $videos = json_decode(File::get($videosPath), true) ?? [];

        $newVideo = [
            'id' => count($videos) + 1,
            'video_url' => $videoUrl,
            'thumbnail_url' => $this->getThumbnailVkVideo($videoUrl),
        ];

        $videos[] = $newVideo;
        File::put($videosPath, json_encode($videos, JSON_PRETTY_PRINT));

        return response()->json($newVideo, 201);
    }

    public function destroy($id)
    {
        $videos = json_decode(File::get(storage_path('app/videos.json')), true);
        $videos = array_filter($videos, function ($video) use ($id) {
            return $video['id'] != $id;
        });
        File::put(storage_path('app/videos.json'), json_encode(array_values($videos), JSON_PRETTY_PRINT));
        return response()->json(null, 204);
    }

    private function extractVkVideoId(string $url): ?string
    {
        if (preg_match('/video(-?\d+)_(\d+)/', $url, $matches)) {
            $ownerId = ltrim($matches[1], '-');
            $videoId = $matches[2];

            return '-' . $ownerId . '_' . $videoId;
        }

        return null;
    }

    public function getThumbnailVkVideo($inputVideoUrl){
        $thumbnailUrl = null;

        $vkVideoId = $this->extractVkVideoId($inputVideoUrl);

        if (!$vkVideoId) {
            return response()->json(['error' => 'Could not extract VK video ID from the provided URL'], 422);
        }

        $vkResponse = Http::asForm()->post('https://api.vk.com/method/video.get', [
            'access_token' => config('services.vk.token'),
            'v' => config('services.vk.version'),
            'videos' => $vkVideoId,
        ]);

        if (!$vkResponse->ok()) {
            Log::error('VK API error', ['body' => $vkResponse->body(), 'vk_video_id' => $vkVideoId, 'input_url' => $inputVideoUrl]);
            $errorData = $vkResponse->json();
            if (isset($errorData['error']['error_code']) && $errorData['error']['error_code'] === 500) {
                return response()->json(['error' => 'Video not found on VK'], 404);
            }
            return response()->json(['error' => 'Failed to get data from VK'], 502);
        }

        $vkData = $vkResponse->json();

        if (!isset($vkData['response']['items']) || empty($vkData['response']['items'])) {
            Log::warning('VK API response has no items', ['vk_data' => $vkData, 'vk_video_id' => $vkVideoId, 'input_url' => $inputVideoUrl]);
            return response()->json(['error' => 'No video items found in VK response'], 400);
        }

        if (isset($vkData['response']['items'][0]['image'])) {
            $images = $vkData['response']['items'][0]['image'];
            if (!empty($images)) {
                $lastImage = end($images);
                $thumbnailUrl = $lastImage['url'] ?? null;
            } else {
                Log::warning('VK API image array is empty', ['vk_data' => $vkData, 'vk_video_id' => $vkVideoId, 'input_url' => $inputVideoUrl]);
            }
        } else {
            Log::warning('VK API response item has no "image" field', ['vk_data' => $vkData, 'vk_video_id' => $vkVideoId, 'input_url' => $inputVideoUrl]);
        }
        return $thumbnailUrl;
    }
}
