@component('mail::message')
<h1 > {{ ('Crop Connect') }}</h1>

<h1>{{ __('Hi') }},</h1>
<p>{{ __('If you did try to payout, copy and paste this verification code') }}:</p>
<h3 >{{ $otp }}</h3>

<p>{{ __('Thanks') }},</p>
<p>{{ ('Crop Connect') }}.</p>
@endcomponent