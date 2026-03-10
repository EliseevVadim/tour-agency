<?php

namespace App\Support;

class PhoneNormalizer
{
    public static function normalizeRu(string $phone): string
    {
        $digits = preg_replace('/\D+/', '', $phone);

        if (!$digits) {
            return '';
        }

        if (mb_strlen($digits) === 11 && $digits[0] === '8') {
            $digits = '7' . substr($digits, 1);
        }

        if (mb_strlen($digits) === 10) {
            $digits = '7' . $digits;
        }

        if ($digits[0] !== '7') {
            $digits = '7' . substr($digits, -10);
        }

        return '+' . $digits;
    }
}
