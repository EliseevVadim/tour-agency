<?php
namespace App\Services;

use App\Models\PromoCode;
use App\Models\PromoCodeRule;
use Illuminate\Support\Str;

class PromoCodeGeneratorService
{
    protected function getPrefix(?string $packageId): string
    {
        $packageMap = [
            'mini' => 'MINI',
            'opti' => 'OPTI',
        ];

        if ($packageId === null) {
            return 'PROMO';
        }

        if (isset($packageMap[$packageId])) {
            return $packageMap[$packageId];
        }

        return 'PROMO';
    }

    public function generateCode(PromoCodeRule $rule): array
    {
        $prefix = $this->getPrefix($rule->package_id);
        $discount = $rule->discount_value;
        $codeString = $this->generateUniqueCode($prefix, $discount);

        $validDays = $rule->valid_days ?? 365;
        $expiresAt = now()->addDays($validDays);

        return [
            'code' => $codeString,
            'expires_at' => $expiresAt,
        ];
    }

    /**
     * @throws \Exception
     */
    protected function generateUniqueCode(string $prefix, int $discount): string
    {
        $maxAttempts = 10;
        $attempt = 0;

        while ($attempt < $maxAttempts) {
            $randomPart = Str::random(5, true);
            $code = "{$prefix}_{$discount}_{$randomPart}";

            if (!PromoCode::where('code', $code)->exists()) {
                return $code;
            }

            $attempt++;
        }

        throw new \Exception("Не удалось сгенерировать уникальный промокод после {$maxAttempts} попыток.");
    }

    public function generateAndStore(PromoCodeRule $rule): void
    {
        $count = $rule->quantity_to_generate;
        $codesToStore = [];

        for ($i = 0; $i < $count; $i++) {
            $generatedData = $this->generateCode($rule);

            $codesToStore[] = [
                'code' => $generatedData['code'],
                'promo_code_rule_id' => $rule->id,
                'is_used' => false,
                'expires_at' => $generatedData['expires_at'],
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        PromoCode::insert($codesToStore);
    }
}
