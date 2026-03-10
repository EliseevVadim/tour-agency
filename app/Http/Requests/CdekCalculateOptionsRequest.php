<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CdekCalculateOptionsRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'to_location_code' => ['required', 'integer'],
            'weight' => ['required', 'integer', 'min:1'],
            'length' => ['required', 'integer', 'min:1'],
            'width' => ['required', 'integer', 'min:1'],
            'height' => ['required', 'integer', 'min:1'],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
