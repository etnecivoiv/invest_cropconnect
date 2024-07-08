<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no,  maximum-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="app-name" content="{{ env('APP_NAME') }}">
    <link rel="icon" href="{{ asset(get_option('primary_data')['favicon'] ?? '') }}" type="image/png">
    <meta name="app-translations" content="{{ getTranslationFile() }}" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700">
    <title inertia>{{ config('app.name', 'Laravel') }}</title>
    <script>
          "use strict"
        if(localStorage.getItem('theme') === null){
            localStorage.setItem('theme','dark')
        }
        if (
            localStorage.getItem('theme') === 'dark' ||
            (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    </script>
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/custom.css') }}" media="all">
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/custom-toastr.css') }}" media="all">
    @vite(['resources/js/app.js', 'resources/css/app.css', 'resources/scss/admin/main.scss'])

    @inertiaHead
</head>

<body>
    @routes
    @inertia
</body>

</html>