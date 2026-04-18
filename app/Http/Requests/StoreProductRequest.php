<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],

            'old_price' => ['required', 'integer', 'min:0'],

            'is_hit' => ['sometimes', 'boolean'],
            'category_id' => ['required', 'exists:categories,id'],

            'images' => ['required','array'],
            'images.*.image' => ['required','file','image','max:5120'],
            'images.*.primary' => ['required','boolean'],

            'attributes' => ['sometimes','array'],
            'available_skus' => ['sometimes','array']
        ];
    }

    public function validatedPayload(): array
    {
        return $this->validated();
    }

    protected function prepareForValidation(): void
    {
        foreach (['attributes', 'available_skus'] as $field) {
            $value = $this->input($field);

            if (is_string($value) && $value !== '') {
                $decoded = json_decode($value, true);

                if (json_last_error() === JSON_ERROR_NONE) {
                    $this->merge([$field => $decoded]);
                }
            }
        }
    }
}
