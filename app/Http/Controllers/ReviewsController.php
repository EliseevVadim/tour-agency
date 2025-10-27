<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class ReviewsController extends Controller
{
    public function initializeJsonFile()
    {
        $filePath = storage_path('app/reviews.json');

        if (File::exists($filePath)) {
            return;
        }

        $initialData = [
            [
                "id" => 1,
                "name" => "Нина Александровна",
                "gender" => "была",
                "location" => "Грузии",
                "text" => "Спасибо за организацию отличного путешествия которое запомнится на всю жизнь!",
                "backgroundImage" => "/img/review-sample-bg.png",
                "profileImage" => "/img/avatar-sample.png"
            ],
            [
                "id" => 2,
                "name" => "Владимир Александрович",
                "gender" => "был",
                "location" => "Грузии",
                "text" => "Спасибо за организацию отличного путешествия которое запомнится на всю жизнь!",
                "backgroundImage" => "/img/review-sample-bg.png",
                "profileImage" => "/img/avatar-sample.png"
            ]
        ];

        File::put($filePath, json_encode($initialData, JSON_PRETTY_PRINT));

        return "Файл reviews.json успешно создан!";
    }
}
