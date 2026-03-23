<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        foreach (['attributes', 'available_skus', 'existing_images'] as $field) {
            $value = $this->input($field);

            if (is_string($value) && $value !== '') {
                $decoded = json_decode($value, true);
                if (json_last_error() === JSON_ERROR_NONE) {
                    $this->merge([$field => $decoded]);
                }
            }
        }
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'old_price' => ['nullable', 'integer', 'min:0'],
            'is_hit' => ['nullable', 'boolean'],
            'category_id' => ['required', 'exists:categories,id'],

            'existing_images' => ['sometimes', 'array'],

            'new_images' => ['sometimes', 'array'],

            'attributes' => ['sometimes', 'array'],

            'available_skus' => ['sometimes', 'array'],
        ];
    }

    public function validatedPayload(): array
    {
        return $this->validated();
    }
}
