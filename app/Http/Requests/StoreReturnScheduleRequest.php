<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rules\File;
use Illuminate\Foundation\Http\FormRequest;

class StoreReturnScheduleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'project_id' => ['required'],
            'project_duration_id' => ['required'],
            'return_type' => ['required', 'in:fixed,percent'],
            'profit_type' => ['required', 'in:profit,loss'],
            'amount' => ['required', 'numeric'],
            'attachment' => ['nullable', File::types(['jpg', 'png', 'pdf', 'doc', 'docx'])->max(5000)],
            'return_date' => ['required', 'date', 'after:yesterday'],
        ];
    }

    public function attributes()
    {
        return [
            'project_duration_id' => 'project_duration'
        ];
    }
}
