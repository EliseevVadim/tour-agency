<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ClipController extends Controller
{
    public function index()
    {
        $filePath = storage_path('app/clips.json');

        if (!File::exists($filePath)) {
            $this->initializeJsonFile();
            return view('admin.clips');
        }

        return view('admin.clips');
    }

    public function initializeJsonFile()
    {
        $filePath = storage_path('app/clips.json');

        if (File::exists($filePath)) {
            return redirect()->route('clips.index');
        }

        $initialData = [
            [
                "id" => 2,
                "video_url" => "https://vkvideo.ru/@put_club/clips?z=clip-221754888_456244079/club221754888",
                "thumbnail_url" => "https://sun9-34.userapi.com/impg/Uc9WBWfjtyqxB011wlWxubzSOQ_Cui3CbNi6Eg/XqGX70TTC_8.jpg?quality=90&proxy=1&sign=05d14f8abddc28fe9f3d5ad9d44f4cf7&c_uniq_tag=2-zfwAW_OAxa07swZVQLU349IlXtqQ5w7FWTL-Rb6fM&type=video_thumb"
            ],
            [
                "id" => 2,
                "video_url" => "https://vk.com/put_club?feedType=ownerFeed&owner=-221754888&z=clip-221754888_456244034",
                "thumbnail_url" => "https://sun9-35.userapi.com/impg/7EvJRxRfuHCnIBvNNlJS8Qk_lAgQ90jFOazpkQ/63TMN4bJ2og.jpg?quality=90&proxy=1&sign=f1d85d94fae832ea5011eb220bcbf30a&c_uniq_tag=a5w1OTOrIzxK58wdGN8hta8texen0ws47SpVrPHiL7c&type=video_thumb"
            ]
        ];

        File::put($filePath, json_encode($initialData, JSON_PRETTY_PRINT));

        return "Файл clips.json успешно создан!";
    }

    public function getClips()
    {
        $clips = json_decode(File::get(storage_path('app/clips.json')), true);
        return response()->json($clips);
    }

    public function store(Request $request)
    {
        $clips = json_decode(File::get(storage_path('app/clips.json')), true);
        $newClip = [
            'id' => count($clips) + 1,
            'video_url' => $request->input('video_url'),
            'thumbnail_url' => $this->getThumbnailVkClip($request->input('video_url')),
        ];
        $clips[] = $newClip;
        File::put(storage_path('app/clips.json'), json_encode($clips, JSON_PRETTY_PRINT));
        return response()->json($newClip, 201);
    }

    public function destroy($id)
    {
        $clips = json_decode(File::get(storage_path('app/clips.json')), true);
        $clips = array_filter($clips, function ($clip) use ($id) {
            return $clip['id'] != $id;
        });
        File::put(storage_path('app/clips.json'), json_encode(array_values($clips), JSON_PRETTY_PRINT));
        return response()->json(null, 204);
    }

    private function extractVkClipId(string $url): ?string
    {
        if (preg_match('/clip(-?\d+)_(\d+)/', $url, $matches)) {
            $ownerId = ltrim($matches[1], '-');
            $videoId = $matches[2];

            return '-' . $ownerId . '_' . $videoId;
        }

        return null;
    }

    public function getThumbnailVkClip($inputClipUrl){
        $thumbnailUrl = null;

        $vkClipId = $this->extractVkClipId($inputClipUrl);

        if (!$vkClipId) {
            return response()->json(['error' => 'Could not extract VK clip ID from the provided URL'], 422);
        }

        $vkResponse = Http::asForm()->post('https://api.vk.com/method/video.get', [
            'access_token' => config('services.vk.token'),
            'v' => config('services.vk.version'),
            'videos' => $vkClipId,
        ]);

        if (!$vkResponse->ok()) {
            Log::error('VK API error', ['body' => $vkResponse->body(), 'vk_clip_id' => $vkClipId, 'input_url' => $inputClipUrl]);
            $errorData = $vkResponse->json();
            if (isset($errorData['error']['error_code']) && $errorData['error']['error_code'] === 500) {
                return response()->json(['error' => 'Clip not found on VK'], 404);
            }
            return response()->json(['error' => 'Failed to get data from VK'], 502);
        }

        $vkData = $vkResponse->json();

        if (!isset($vkData['response']['items']) || empty($vkData['response']['items'])) {
            Log::warning('VK API response has no items', ['vk_data' => $vkData, 'vk_clip_id' => $vkClipId, 'input_url' => $inputClipUrl]);
            return response()->json(['error' => 'No clip items found in VK response'], 400);
        }

        if (isset($vkData['response']['items'][0]['image'])) {
            $images = $vkData['response']['items'][0]['image'];
            if (!empty($images)) {
                $lastImage = end($images);
                $thumbnailUrl = $lastImage['url'] ?? null;
            } else {
                Log::warning('VK API image array is empty', ['vk_data' => $vkData, 'vk_clip_id' => $vkClipId, 'input_url' => $inputClipUrl]);
            }
        } else {
            Log::warning('VK API response item has no "image" field', ['vk_data' => $vkData, 'vk_clip_id' => $vkClipId, 'input_url' => $inputClipUrl]);
        }
        return $thumbnailUrl;
    }
}
