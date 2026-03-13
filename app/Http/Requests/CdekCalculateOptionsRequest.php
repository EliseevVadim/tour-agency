<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CdekCalculateOptionsRequest extends FormRequest
{
    protected function prepareForValidation(): void
    {
        $data = $this->all();

        foreach (['length', 'width', 'height', 'weight'] as $field) {
            if (isset($data[$field]) && (int)$data[$field] === 0) {
                unset($data[$field]);
            }
        }

        $this->replace($data);
    }

    public function rules(): array
    {
        return [
            'to_location_code' => ['required', 'integer'],
            'weight' => ['required', 'integer', 'min:1'],
            'length' => ['nullable', 'integer', 'min:1'],
            'width' => ['nullable', 'integer', 'min:1'],
            'height' => ['nullable', 'integer', 'min:1'],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
