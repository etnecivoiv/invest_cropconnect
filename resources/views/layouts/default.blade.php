<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no,  maximum-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

    {{-- favicon --}}
    <link rel="icon" href="{{ asset(get_option('primary_data')['favicon'] ?? '/favicon.ico') }}" type="image/png">

    {{-- Seo --}}
    <meta name="app-name" content="{{ config('app.name') }}" />
    <title inertia>{{ SeoMeta::get('title') ?? SeoMeta::get('site_name') }} - {{ config('app.name') }}</title>

    <meta name="description" itemprop="description" inertia content="{{ SeoMeta::get('matadescription') }}" />
    <meta name="keywords" inertia content="{{ SeoMeta::get('matatag') }}" />

    <meta property="og:title" inertia content="{{ SeoMeta::get('site_name') }}" />
    <meta property="og:description" inertia content="{{ SeoMeta::get('matadescription') }}" />
    <meta property="og:url" inertia content="{{ request()->fullUrl() }}" />

    <meta property="og:image" inertia content="{{ SeoMeta::get('preview') }}" />

    <meta name="twitter:card" inertia content="{{ SeoMeta::get('matadescription') }}" />
    <meta name="twitter:title" inertia content="{{ SeoMeta::get('twitter_site_title') }}" />
    {{-- Seo End --}}
    <meta name="app-translations" content="{{ getTranslationFile() }}" />
    <!-- stylesheets -->
    <link rel="stylesheet" href="{{ asset('assets/css/rt-plugins.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/custom-toastr.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/custom.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/toastify.min.css') }}">

    @inertiaHead
    @vite(['resources/js/app.js', 'resources/scss/custom.scss', 'resources/css/app.css'])
    <link rel="stylesheet" href="{{ asset('assets/css/app.css?v=2') }}">
  
</head>

<body class=" font-gilroy font-medium text-gray text-lg leading-[27px]">
    @routes
    @inertia

    <!-- scripts -->
    <script src="{{ asset('assets/js/popper.min.js') }}"></script>
    <script src="{{ asset('assets/js/jquery-3.7.1.min.js') }}"></script>
    <script src="{{ asset('assets/js/rt-plugins.js') }}"></script>
    <script src="{{ asset('assets/js/iconify-icon.min.js') }}"></script>
    <script src="{{ asset('assets/js/toastify-js.js') }}"></script>
    <script src="{{ asset('assets/js/app.js?v=3') }}" defer></script>
</body>

</html>