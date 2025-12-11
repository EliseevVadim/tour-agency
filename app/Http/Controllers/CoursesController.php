<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class CoursesController extends Controller
{
    protected $filePath;

    public function __construct()
    {
        $this->filePath = storage_path('app/courses.json');

        if (!File::exists($this->filePath)) {
            $this->initializeJsonFile();
        }
    }

    public function initializeJsonFile()
    {
        $filePath = storage_path('app/courses.json');

        if (File::exists($filePath)) {
            return ;
        }

        $initialData = [
            "packages" => [
                "mini" => [
                    "id" => "mini",
                    "name" => "Мини",
                    "priceOld" => 14500,
                    "priceNew" => 12000,
                    "contentLink" => "",
                ],
                "opti" => [
                    "id" => "opti",
                    "name" => "Опти",
                    "priceOld" => 14500,
                    "priceNew" => 12000,
                    "contentLink" => "",
                ],
                "maxi" => [
                    "id" => "maxi",
                    "name" => "Макси",
                    "priceOld" => 14500,
                    "priceNew" => 12000,
                    "contentLink" => "",
                ]
            ]
        ];

        File::put($filePath, json_encode($initialData, JSON_PRETTY_PRINT));

        return "Файл courses.json успешно создан!";
    }

    public function getCourses()
    {
        if (!File::exists($this->filePath)) {
            $this->initializeJsonFile();
        }

        $courses = json_decode(File::get(storage_path('app/courses.json')), true);
        return response()->json($courses);
    }

    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'priceOld' => 'required|numeric|min:0',
            'priceNew' => 'required|numeric|min:0',
            'contentLink' => 'nullable|string|url|max:255',
        ]);

        $data = $this->getJsonData();
        $packages = $data['packages'] ?? [];
        $packageIndex = collect($packages)->search(fn($pkg) => $pkg['id'] === $id);

        if ($packageIndex === false) {
            return response()->json(['message' => 'Пакет курса не найден'], 404);
        }

        $updatedPackage = $packages[$packageIndex];
        $updatedPackage['name'] = $request->input('name');
        $updatedPackage['priceOld'] = $request->input('priceOld');
        $updatedPackage['priceNew'] = $request->input('priceNew');
        $updatedPackage['contentLink'] = $request->input('contentLink');

        $packages[$packageIndex] = $updatedPackage;
        $data['packages'] = $packages;

        if (!$this->saveJsonData($data)) {
            return response()->json(['message' => 'Ошибка при сохранении данных'], 500);
        }

        return response()->json(['message' => 'Данные пакета успешно обновлены', 'course' => $updatedPackage]);
    }

    protected function getJsonData()
    {
        if (!File::exists($this->filePath)) {
            $this->initializeJsonFile();
        }
        $json = File::get($this->filePath);
        return json_decode($json, true);
    }

    protected function saveJsonData(array $data): bool
    {
        return File::put($this->filePath, json_encode($data, JSON_PRETTY_PRINT)) !== false;
    }
}
