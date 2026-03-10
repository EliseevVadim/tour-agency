<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CdekCreateOrderRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'delivery_mode' => ['required', Rule::in(['door', 'pickup'])],

            'city' => ['required', 'string', 'max:255'],
            'city_code' => ['required', 'integer'],
            'tariff_code' => ['nullable', 'integer'],

            'recipient_name' => ['required', 'string', 'max:255'],
            'recipient_phone' => ['required', 'string', 'max:50'],
            'recipient_email' => ['nullable', 'email', 'max:255'],

            'street' => ['required_if:delivery_mode,door', 'nullable', 'string', 'max:255'],
            'house' => ['required_if:delivery_mode,door', 'nullable', 'string', 'max:50'],
            'flat' => ['nullable', 'string', 'max:50'],
            'entrance' => ['nullable', 'string', 'max:50'],
            'floor' => ['nullable', 'string', 'max:50'],

            'pickup_point_code' => ['required_if:delivery_mode,pickup', 'nullable', 'string', 'max:100'],
            'pickup_point_address' => ['nullable', 'string', 'max:500'],

            'delivery_price' => ['required', 'numeric', 'min:0'],

            'items' => ['required', 'array', 'min:1'],
            'items.*.name' => ['required', 'string'],
            'items.*.sku' => ['nullable', 'string'],
            'items.*.amount' => ['required', 'numeric', 'min:1'],
            'items.*.payment_value' => ['nullable', 'numeric', 'min:0'],
            'items.*.weight' => ['required', 'integer', 'min:1'],
            'items.*.cost' => ['required', 'numeric', 'min:0'],
            'items.*.quantity' => ['required', 'integer', 'min:1'],

            'package.weight' => ['required', 'integer', 'min:1'],
            'package.length' => ['integer', 'min:1'],
            'package.width' => ['integer', 'min:1'],
            'package.height' => ['integer', 'min:1'],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
