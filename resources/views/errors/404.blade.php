<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <title>404 | Page Not Found !</title>
    <link rel="stylesheet" href="{{ asset('assets/css/rt-plugins.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/app.css') }}">
</head>

<body class="font-gilroy font-medium text-gray text-lg leading-[27px]">
    <div class=" min-h-screen bg-[url('../images/all-img/404-bg.png')] bg-cover bg-no-repeat bg-center">
        <div class="max-w-[570px] mx-auto flex flex-col items-center text-center justify-center min-h-screen px-4">
            <img src="{{ asset('assets/images/all-img/404.svg') }}" alt="" class="mb-14">
            <h2 class="mb-6 ">{{ __('Page not found') }}</h2>
           
            <a href="/" class="btn btn-primary">{{ __('Back To Home') }}</a>
        </div>
    </div>
</body>

</html>
