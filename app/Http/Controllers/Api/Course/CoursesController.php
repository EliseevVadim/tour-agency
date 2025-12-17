<?php

namespace App\Http\Controllers\Api\Course;

use App\Http\Controllers\Controller;
use App\Http\Resources\PackageAdminResource;
use App\Http\Resources\PackageResource;
use App\Models\Package;
use App\Services\NotificationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;

class CoursesController extends Controller
{

    protected function getPackagesData(string $resourceClass): array
    {
        $packages = Package::all()->keyBy('id');
        $expectedKeys = ['mini', 'opti', 'maxi'];
        $responsePackages = [];

        foreach ($expectedKeys as $key) {
            if ($packages->has($key)) {
                $responsePackages[$key] = new $resourceClass($packages->get($key));
            } else {
                $responsePackages[$key] = null;
            }
        }

        return $responsePackages;
    }

    public function getCourses(): JsonResponse
    {
        $responsePackages = $this->getPackagesData(PackageResource::class);

        return response()->json([
            'packages' => $responsePackages
        ]);
    }

    public function getAdminCourses(): JsonResponse
    {
        $responsePackages = $this->getPackagesData(PackageAdminResource::class);

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

    public function getRequestPresentation(Request $request)
    {
        app(NotificationService::class)->sendPresentationNotification(
            $request->input('full_name') ?? 'Guest',
            $request->input('phone_number') ?? 'Unknown',
            $request->input('email') ?? 'Unknown',
        );

        return Response::json([
            'success' => true,
            'redirect' => route('courses'),
            'notification' => [
                'isPresentation' => true,
                'title' => 'Ваша заявка принята, в ближайшее время с Вами свяжется персональный менеджер
            туристической компании «В ПУТЬ»',
                'class'=> 'mb-4'
            ]
        ]);
    }
}
