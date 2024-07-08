<?php

namespace App\Http\Requests;

use Illuminate\Support\Str;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProjectRequest extends FormRequest
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
            'category_id' => ['required', 'exists:categories,id'],
            'title' => ['required', 'string', 'max:255'],
            'preview' => ['nullable', 'image', 'max:2048'],
            'cover_image' => ['nullable', 'image', 'max:2048'],
            'total_units' => ['required', 'numeric'],
            'invest_amount' => ['required', 'numeric'],
            'expire_date' => ['required', 'date', 'after:today'],
            'address' => ['required', 'string', 'max:255'],

            // invest calculations
            'durations.*.duration' => ['required'],
            'durations.*.duration_type' => ['required'],
            'durations.*.min_profit_return' => ['required'],
            'durations.*.max_profit_return' => ['required'],
            'durations.*.return_type' => ['required'],
            'durations.*.loss_min_range' => ['required'],
            'durations.*.loss_max_range' => ['required'],

            // faqs
            'faqs' => ['nullable'],
            'faqs.*.qns' => ['required', 'string'],
            'faqs.*.ans' => ['required', 'string'],

            // seo [meta]
            'seo_title' => ['nullable', 'string', 'max:255'],
            'seo_image' => ['nullable', 'image', 'max:1024'],
            'seo_description' => ['nullable', 'string'],
            'seo_tags' => ['nullable', 'string', 'max:255'],

            // info [meta]
            'short_description' => ['required', 'string', 'max:50000'],
            'main_description' => ['required', 'string'],

            'accept_new_investor' => ['required'],
            'status' => ['required'],
        ];
    }

    public function attributes()
    {
        return [
            'category_id' => 'category',
            'durations.*.duration' => 'duration',
            'durations.*.duration_type' => 'duration type',
            'durations.*.min_profit_return' => 'min profit return',
            'durations.*.max_profit_return' => 'max profit return',
            'durations.*.return_type' => 'return type',
            'durations.*.loss_min_range' => 'loss min range',
            'durations.*.loss_max_range' => 'loss max range',

            'faqs.*.qns' => 'qns',
            'faqs.*.ans' => 'ans',
        ];
    }
}
