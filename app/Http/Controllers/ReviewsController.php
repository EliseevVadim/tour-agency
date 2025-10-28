<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class ReviewsController extends Controller
{
    protected $filePath;
    protected $uploadDirectory;

    public function __construct()
    {
        $this->filePath = storage_path('app/reviews.json');
        if (!File::exists($this->filePath)) {
            $this->initializeJsonFile();
        }

        $this->uploadDirectory = public_path('img/reviews/');
        if (!File::exists($this->uploadDirectory)) {
            File::makeDirectory($this->uploadDirectory, 0755, true);
        }
    }

    public function initializeJsonFile()
    {
        $filePath = storage_path('app/reviews.json');

        if (File::exists($filePath)) {
            return;
        }
        /*    "id" => 1,
               "name" => "Анна Иванова",
               "pre_location" => "была на",
               "country" => "Мальдивах",
               "avatar" => "/avatars/anna_ivanova.jpg",
               "photos" => [
                   "/travel_photos/maldives_1.jpg",
                   "/travel_photos/maldives_2.jpg",
                   "/travel_photos/maldives_3.jpg",
                   "/travel_photos/maldives_2.jpg",
                   "/travel_photos/maldives_3.jpg"
               ],
               "review_text" => "Это было незабываемое путешествие! Море, солнце, полный релакс. Обязательно вернусь сюда снова."*/

        $initialData = [
            []
        ];

        File::put($filePath, json_encode($initialData, JSON_PRETTY_PRINT));

        return "Файл reviews.json успешно создан!";
    }

    public function getReviews()
    {
        $reviews = json_decode(File::get(storage_path('app/reviews.json')), true);
        return response()->json($reviews);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'pre_location' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            'review_text' => 'required|string',
            'avatar' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
            'photos.*' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
        ]);

        try {
            $reviewsData = json_decode(File::get($this->filePath), true) ?? [];

            $newId = 1;
            if (!empty($reviewsData)) {
                $lastId = collect($reviewsData)->max('id');
                $newId = $lastId + 1;
            }

            $avatarFileName = null;
            if ($request->hasFile('avatar')) {
                $image = $request->file('avatar');
                $fileName = Str::uuid() . '.' . $image->getClientOriginalExtension();
                $image->move($this->uploadDirectory . '/avatars', $fileName);
                $avatarFileName = $fileName;
            }

            $photosFileNames = [];
            if ($request->hasFile('photos')) {
                foreach ($request->file('photos') as $photo) {
                    $fileName = Str::uuid() . '.' . $photo->getClientOriginalExtension();
                    $photo->move($this->uploadDirectory, $fileName);
                    $photosFileNames[] = $fileName;
                }
            }

            $newReview = [
                'id' => $newId,
                'name' => $validatedData['name'],
                'pre_location' => $validatedData["pre_location"],
                'country' => $validatedData['country'],
                'avatar' => $avatarFileName ? $avatarFileName : null,
                'photos' => $photosFileNames,
                'review_text' => $validatedData['review_text'],
            ];

            $reviewsData[] = $newReview;
            File::put($this->filePath, json_encode($reviewsData, JSON_PRETTY_PRINT));
            return response()->json($newReview, 201);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Не удалось добавить отзыв. Произошла ошибка сервера.'], 500);
        }
    }
}
