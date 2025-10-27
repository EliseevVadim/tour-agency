<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class TeamController extends Controller
{
    protected $filePath;
    protected $uploadDirectory;

    public function __construct()
    {
        $this->filePath = storage_path('app/team.json');
        if (!File::exists($this->filePath)) {
            $this->initializeJsonFile();
        }

        $this->uploadDirectory = public_path('img/team');
        if (!File::exists($this->uploadDirectory)) {
            File::makeDirectory($this->uploadDirectory, 0755, true);
        }
    }

    public function initializeJsonFile()
    {
        $filePath = storage_path('app/team.json');

        if (File::exists($filePath)) {
            return ;
        }

        $initialData = [
            [
                "id" => 1,
                "image_url" => "",
                "name" => "",
                "position" => ""
            ]
        ];

        File::put($filePath, json_encode($initialData, JSON_PRETTY_PRINT));

        return "Файл team.json успешно создан!";
    }

    public function store(Request $request)
    {
        $request->validate([
            'image_url' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
            'name' => 'required|string|max:255',
            'position' => 'nullable|string|max:255',
        ]);

        try {
            $teamData = json_decode(File::get($this->filePath), true) ?? [];

            $newId = 1;
            if (!empty($teamData)) {
                $lastId = collect($teamData)->max('id');
                $newId = $lastId + 1;
            }

            $imagePath = null;
            if ($request->hasFile('image_url')) {
                $image = $request->file('image_url');
                $fileName = Str::uuid() . '.' . $image->getClientOriginalExtension();
                $image->move($this->uploadDirectory, $fileName);
                $imagePath = $fileName;
            }

            $newMember = [
                'id' => $newId,
                'image_url' => $imagePath,
                'name' => $request->input('name'),
                'position' => $request->input('position'),
            ];

            $teamData[] = $newMember;

            File::put($this->filePath, json_encode($teamData, JSON_PRETTY_PRINT));

            return response()->json($newMember, 201);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Не удалось добавить сотрудника.'], 500);
        }
    }


    public function update(Request $request, int $id)
    {
        $request->validate([
            'image_url' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
            'name'      => 'required|string|max:255',
            'position'  => 'nullable|string|max:255',
        ]);

        try {
            $teamData = collect(json_decode(File::get($this->filePath), true) ?? []);
            $memberIndex = $teamData->search(fn ($m) => $m['id'] === $id);

            if ($memberIndex === false) {
                return response()->json(['error' => 'Сотрудник не найден'], 404);
            }

            $currentMember = $teamData[$memberIndex];
            $imagePath = $currentMember['image_url'];
            if ($request->hasFile('image_url')) {
                $image = $request->file('image_url');
                $fileName = Str::uuid() . '.' . $image->getClientOriginalExtension();
                $image->move($this->uploadDirectory, $fileName);

                if ($imagePath && File::exists($this->uploadDirectory . '/' . $imagePath)) {
                    File::delete($this->uploadDirectory . $imagePath);
                }

                $imagePath = $fileName;
            }

            $newMember = [
                'id'        => $id,
                'image_url' => $imagePath,
                'name'      => $request->input('name'),
                'position'  => $request->input('position'),
            ];

            $teamData[$memberIndex] = $newMember;
            File::put($this->filePath, json_encode($teamData, JSON_PRETTY_PRINT));

            return response()->json($newMember, 200);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Не удалось обновить сотрудника.'], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $teamData = collect(json_decode(File::get($this->filePath), true) ?? []);
            $member = $teamData->firstWhere('id', $id);

            if (!$member) {
                return response()->json(['error' => 'Сотрудник не найден'], 404);
            }

            if (!empty($member['image_url'])) {
                $filePath = $this->uploadDirectory . '/' . $member['image_url'];
                if (File::exists($filePath)) {
                    File::delete($filePath);
                }
            }

            $updatedData = $teamData->filter(fn ($m) => $m['id'] != $id)->values();
            File::put($this->filePath, json_encode($updatedData, JSON_PRETTY_PRINT));

            return response()->json(['message' => 'Сотрудник удален']);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Ошибка удаления сотрудника'], 500);
        }
    }

    public function getTeam()
    {
        $team = json_decode(File::get(storage_path('app/team.json')), true);
        return response()->json($team);
    }

}
