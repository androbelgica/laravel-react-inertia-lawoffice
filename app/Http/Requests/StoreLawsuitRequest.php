<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreLawsuitRequest extends FormRequest
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
            'title' => 'required|string|max:255',
            'case_number' => 'required|string|max:255',
            'case_type' => 'required|string|max:255',
            'case_status' => 'required|string|max:255',
            'court_name' => 'required|string|max:255',
            'open_date' => 'required|date',
            'close_date' => 'nullable|date',
            'client_id' => 'required|exists:clients,id',
            'lawyer_id' => 'required|exists:lawyers,id',
        ];
    }
}
