<?php

namespace App\Http\Controllers\Api\Course;

use App\Http\Controllers\Controller;
use App\Http\Resources\PackageResource;
use App\Models\Package;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CoursesController extends Controller
{
    public function getCourses(): JsonResponse
    {
        $packages = Package::all()->keyBy('id');
        $expectedKeys = ['mini', 'opti', 'maxi'];
        $responsePackages = [];

        foreach ($expectedKeys as $key) {
            if ($packages->has($key)) {
                $responsePackages[$key] = new PackageResource($packages->get($key));
            } else {
                $responsePackages[$key] = null;
            }
        }

        return response()->json([
            'packages' => $responsePackages
        ]);
    }

    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'priceOld' => 'required|numeric|min:0',
            'priceNew' => 'required|numeric|min:0',
            'contentLink' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $package = Package::find($id);

        if (!$package) {
            return response()->json(['message' => 'Пакет курса не найден'], 404);
        }

        $package->name = $request->input('name');
        $package->price_old = $request->input('priceOld');
        $package->price_new = $request->input('priceNew');
        $package->content_link = $request->input('contentLink');
        $package->save();

        return (new PackageResource($package))
            ->response()
            ->setStatusCode(200);
    }
}
