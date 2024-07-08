@component('mail::message')

{{ $subject }}

{{ __('Name') }} <strong>{{ $name }}</strong><br> 
{{ __('Email') }} <strong>{{ $email }}</strong><br> 


{{ $message }}


{{ __('Thanks') }},<br>
{{ config('app.name') }}
@endcomponent