<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class TeamController extends Controller
{
    protected $filePath;
    protected $uploadDirectory;

    public function __construct()
    {
        $this->filePath = storage_path('app/team_data.json');
        if (!File::exists($this->filePath)) {
            $this->initializeJsonFile();
        }

        $this->uploadDirectory = public_path('images/team');
        if (!File::exists($this->uploadDirectory)) {
            File::makeDirectory($this->uploadDirectory, 0755, true);
        }
    }

    public function index()
    {
        $filePath = storage_path('app/videos.json');

        if (!File::exists($filePath)) {
            $this->initializeJsonFile();
            return view('admin.team');
        }

        return view('admin.team');
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
            'position' => 'required|string|max:255',
        ]);

        if (!File::exists($this->filePath)) {
            $this->initializeJsonFile();
        }

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
                $imagePath = 'images/team/' . $fileName;
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
            return response()->json(['error' => 'Не удалось добавить члена команды.'], 500);
        }
    }


    public function update(Request $request, $id)
    {
        $request->validate([
            'image_url' => 'nullable|url|max:255',
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
        ]);

        if (!File::exists($this->filePath)) {
            return response()->json(['error' => 'Файл данных команды не существует.'], 404);
        }

        try {
            $teamData = json_decode(File::get($this->filePath), true) ?? [];
            $memberIndex = collect($teamData)->search(fn($member) => $member['id'] == $id);

            if ($memberIndex === false) {
                return response()->json(['error' => 'Член команды с таким ID не найден.'], 404);
            }

            $teamData[$memberIndex]['image_url'] = $request->input('image_url', $teamData[$memberIndex]['image_url']);
            $teamData[$memberIndex]['name'] = $request->input('name', $teamData[$memberIndex]['name']);
            $teamData[$memberIndex]['position'] = $request->input('position', $teamData[$memberIndex]['position']);

            File::put($this->filePath, json_encode($teamData, JSON_PRETTY_PRINT));

            return response()->json($teamData[$memberIndex]);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Не удалось обновить члена команды.'], 500);
        }
    }

    public function destroy($id)
    {
        if (!File::exists($this->filePath)) {
            return response()->json(['error' => 'Файл данных команды не существует.'], 404);
        }

        try {
            $teamData = json_decode(File::get($this->filePath), true) ?? [];
            $initialCount = count($teamData);
            $teamData = collect($teamData)->reject(function ($member) use ($id) {
                return $member['id'] == $id;
            })->values()->toArray();

            if (count($teamData) === $initialCount) {
                return response()->json(['error' => 'Член команды с таким ID не найден.'], 404);
            }

            File::put($this->filePath, json_encode($teamData, JSON_PRETTY_PRINT));

            return response()->json(['message' => 'Член команды успешно удален.']);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Не удалось удалить члена команды.'], 500);
        }
    }
}
