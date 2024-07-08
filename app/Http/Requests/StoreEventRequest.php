<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEventRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'body' => ['required', 'string', 'max:1000'],
            'preview' => ['required', 'image', 'max:2048'],
            'start_at' => ['required', 'date'],
            'location' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['required', 'string', 'max:20'],
            'total_seat' => ['required', 'numeric'],
            'seat_prefix' => ['nullable', 'string', 'max:5'],
            'seat_limit' => ['required', 'numeric', 'lte:total_seat'],
            'is_free' => ['required', 'boolean'],
            'fee_amount' => ['required_if:is_free,0', 'numeric'],
            'is_active' => ['nullable'],

            'guests.*.name' => ['required', 'string', 'max:255'],
            'guests.*.designation' => ['required', 'string', 'max:255'],
            'guests.*.preview' => ['required', 'image', 'max:1024'],
        ];
    }

    public function attributes()
    {
        return [
            'guests.*.name' => 'name',
            'guests.*.designation' => 'designation',
            'guests.*.preview' => 'preview',
            'is_free' => 'event type',
        ];
    }
    public function messages()
    {
        return [
            'fee_amount.required_if' => __('The fee amount field is required'),
        ];
    }
}
