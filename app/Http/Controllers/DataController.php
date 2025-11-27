<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Response;

class DataController extends Controller
{
    protected $filePath;

    public function __construct()
    {
        $this->filePath = storage_path('app/contacts.json');
        if (!File::exists($this->filePath)) {
            $this->initializeJsonFile();
        }
    }

    public function initializeJsonFile()
    {
        $filePath = storage_path('app/contacts.json');

        if (File::exists($filePath)) {
            return;
        }

        $initialData = [
            'telegram' => '',
            'whatsapp' => '',
            'max'      => '',
            'vk'       => '',
            'viber'    => '',
        ];

        File::put($filePath, json_encode($initialData, JSON_PRETTY_PRINT));
        return 'Файл contacts.json успешно создан!';
    }

    public function getContacts()
    {
        $contacts = json_decode(File::get(storage_path('app/contacts.json')), true);
        return response()->json($contacts);
    }

    public function updateContacts(Request $request)
    {
        $validatedData = $request->validate([
            'telegram' => 'nullable',
            'whatsapp' => 'nullable',
            'max' => 'nullable',
            'vk' => 'nullable',
            'viber' => 'nullable',
        ]);

        try {
            $currentContacts = json_decode(File::get($this->filePath), true);
            if ($currentContacts === null) {
                $currentContacts = [];
            }

            foreach ($validatedData as $key => $value) {
                $currentContacts[$key] = $value;
            }

            $newJsonData = json_encode($currentContacts, JSON_PRETTY_PRINT);
            File::put($this->filePath, $newJsonData);
            return Response::json(['message' => 'Контакты успешно обновлены!'], 200);

        } catch (\Exception $e) {
            Log::error('Ошибка при обновлении contacts.json: ' . $e->getMessage());
            return Response::json(['message' => 'Произошла ошибка при обновлении контактов.'], 500);
        }
    }
}
