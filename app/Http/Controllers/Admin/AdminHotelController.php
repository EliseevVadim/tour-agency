<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Hotel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AdminHotelController extends Controller
{
    public function index(Request $request)
    {
        $query = Hotel::query()
            ->orderByDesc('id');

        if ($request->filled('search')) {
            $search = trim($request->search);

            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('country', 'like', "%{$search}%")
                    ->orWhere('stars', 'like', "%{$search}%");
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
        $data = $this->validateHotel($request);

        $data['is_active'] = $request->boolean('is_active', true);

        if ($request->hasFile('image')) {
            $data['image_path'] = $request->file('image')->store('hotels', 'public');
        }

        unset($data['image']);

        $hotel = Hotel::create($data);

        return response()->json([
            'data' => $hotel->fresh(),
        ], 201);
    }

    public function update(Request $request, Hotel $hotel)
    {
        $data = $this->validateHotel($request);

        $data['is_active'] = $request->boolean('is_active');

        if ($request->hasFile('image')) {
            if ($hotel->image_path) {
                Storage::disk('public')->delete($hotel->image_path);
            }

            $data['image_path'] = $request->file('image')->store('hotels', 'public');
        }

        unset($data['image']);

        $hotel->update($data);

        return response()->json([
            'data' => $hotel->fresh(),
        ]);
    }

    public function toggle(Hotel $hotel)
    {
        $hotel->update([
            'is_active' => !$hotel->is_active,
        ]);

        return response()->json([
            'data' => $hotel->fresh(),
        ]);
    }

    public function destroy(Hotel $hotel)
    {
        if ($hotel->image_path) {
            Storage::disk('public')->delete($hotel->image_path);
        }

        $hotel->delete();

        return response()->json([
            'message' => 'Отель удалён',
        ]);
    }

    private function validateHotel(Request $request): array
    {
        return $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'country' => ['nullable', 'string', 'max:255'],
            'stars' => ['nullable', 'integer', 'min:1', 'max:5'],
            'description' => ['nullable', 'string'],
            'link' => ['nullable', 'string', 'max:500'],
            'is_active' => ['nullable', 'boolean'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
        ]);
    }
}
