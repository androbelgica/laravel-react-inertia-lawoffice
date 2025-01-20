<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateOtherLegalServiceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'service_name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'date_started' => 'required|date',
            'date_ended' => 'nullable|date',
            'progress_status' => 'required|string|max:255',
            'client_id' => 'required|exists:clients,id',
        ];
    }
}
