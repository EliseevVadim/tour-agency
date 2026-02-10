<?php

namespace App\Http\Controllers;

use App\Models\Package;
use App\Models\PromoCode;
use App\Models\PromoCodeRule;
use App\Services\PromoCodeGeneratorService;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class PromoCodeController extends Controller
{
    protected $generatorService;

    public function __construct(PromoCodeGeneratorService $generatorService)
    {
        $this->generatorService = $generatorService;
    }

    public function getPackages(): JsonResponse
    {
        $packages = Package::all(['id', 'name']);
        return response()->json($packages);
    }

    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'package_id' => '',
                'discount_type' => 'required|in:percent,fixed',
                'discount_value' => 'required|integer|min:1',
                'valid_days' => 'required|integer|min:1|max:1095',
                'quantity_to_generate' => 'required|integer|min:1|max:10000',
            ]);

            $rule = PromoCodeRule::create($validated);
            $this->generatorService->generateAndStore($rule);

            return response()->json([
                'message' => "Успешно создано {$rule->quantity_to_generate} промокодов для пакета ID: {$rule->package_id}.",
                'rule' => $rule
            ], 201);

        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Ошибка валидации данных.',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error("Ошибка генерации промокодов через AJAX: " . $e->getMessage());

            return response()->json([
                'message' => 'Произошла внутренняя ошибка сервера при генерации.',
            ], 500);
        }
    }

    public function index(Request $request): JsonResponse
    {
        $statusFilter = $request->query('status');
        $perPage = $request->query('per_page', 50);
        $codesQuery = PromoCode::query()->with(['rule.package', 'user']);

        if ($statusFilter) {
            $codesQuery->status($statusFilter);
        }
        $codes = $codesQuery->orderByDesc('created_at')->paginate($perPage);

        return response()->json($codes);
    }

    public function check(Request $request): JsonResponse
    {
        $codeString = $request->input('code');
        $packageIdCurrentlyBuying = $request->input('package_id');

        if (!$codeString) {
            return response()->json([
                'status' => 'invalid',
                'message' => 'Необходимо ввести промокод.'
            ], 400);
        }

        $now = Carbon::now();
        $promo = PromoCode::query()
            ->where('code', $codeString)
            ->where('is_used', false)
            ->where('expires_at', '>=', $now)
            ->whereHas('rule', function ($query) use ($packageIdCurrentlyBuying) {
                $query->where(function ($q) use ($packageIdCurrentlyBuying) {
                    $q->where('package_id', $packageIdCurrentlyBuying)
                        ->orWhereNull('package_id');
                });
            })
            ->with('rule.package')
            ->first();

        if (!$promo) {
            $detailedError = $this->getDetailedError($codeString, $packageIdCurrentlyBuying);

            return response()->json([
                'status' => 'invalid',
                'message' => $detailedError
            ], 422);
        }

        return response()->json([
            'status' => 'allowed',
            'message' => 'Промокод успешно применен.',
            'discount_info' => [
                'promo_code_id' => $promo->id,
                'type' => $promo->rule->discount_type,
                'value' => $promo->rule->discount_value,
            ],
            'promo_id' => $promo->id
        ], 200);
    }

    protected function getDetailedError(string $codeString, ?string $packageId): string
    {
        $promo = PromoCode::where('code', $codeString)->first();

        if (!$promo) {
            return 'Промокод не найден.';
        }

        if ($promo->is_used) {
            return 'Этот промокод уже был использован.';
        }

        if (Carbon::parse($promo->expires_at)->isPast()) {
            return 'Срок действия промокода истек.';
        }

        if ($promo->rule->package_id && $promo->rule->package_id !== $packageId) {
            return 'Этот код предназначен для другого тарифа.';
        }

        return 'Промокод недействителен.';
    }
}
