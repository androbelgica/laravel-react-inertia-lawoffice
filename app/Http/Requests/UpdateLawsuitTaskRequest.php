<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateLawsuitTaskRequest extends FormRequest
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
            'task_name' => ['required', 'string', 'max:255'],
            'lawsuit_id' => ['required', 'integer'],
            'user_id' => ['required', 'integer'], // Change assigned_to to user_id
            'priority' => ['required', 'string', 'max:255'],
            'status' => ['required', 'string', 'max:255'],
            'due_date' => ['required', 'date'],
        ];
    }
}
