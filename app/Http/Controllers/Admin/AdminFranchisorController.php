<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Franchisor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AdminFranchisorController extends Controller
{
    public function index(Request $request)
    {
        $query = Franchisor::query()
            ->orderByDesc('id');

        if ($request->filled('search')) {
            $search = trim($request->search);

            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('city', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status')) {
            if ($request->status === 'active') {
                $query->where('is_active', true);
            }

            if ($request->status === 'inactive') {
                $query->where('is_active', false);
            }
        }

        return response()->json([
            'data' => $query->paginate(20),
        ]);
    }

    public function store(Request $request)
    {
        $data = $this->validateData($request);

        $data['is_active'] = $request->boolean('is_active', true);

        if ($request->hasFile('image')) {
            $data['image_path'] = $request->file('image')->store('franchisors', 'public');
        }

        unset($data['image']);

        $franchisor = Franchisor::create($data);

        return response()->json([
            'data' => $franchisor,
        ], 201);
    }

    public function update(Request $request, Franchisor $franchisor)
    {
        $data = $this->validateData($request);

        $data['is_active'] = $request->boolean('is_active');

        if ($request->hasFile('image')) {
            if ($franchisor->image_path) {
                Storage::disk('public')->delete($franchisor->image_path);
            }

            $data['image_path'] = $request->file('image')->store('franchisors', 'public');
        }

        unset($data['image']);

        $franchisor->update($data);

        return response()->json([
            'data' => $franchisor->fresh(),
        ]);
    }

    public function toggle(Franchisor $franchisor)
    {
        $franchisor->update([
            'is_active' => !$franchisor->is_active,
        ]);

        return response()->json([
            'data' => $franchisor->fresh(),
        ]);
    }

    public function destroy(Franchisor $franchisor)
    {
        if ($franchisor->image_path) {
            Storage::disk('public')->delete($franchisor->image_path);
        }

        $franchisor->delete();

        return response()->json([
            'message' => 'Франчайзер удалён',
        ]);
    }

    private function validateData(Request $request): array
    {
        return $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'city' => ['nullable', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'link' => ['nullable', 'string', 'max:500'],
            'is_active' => ['nullable', 'boolean'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp'],
        ]);
    }
}
