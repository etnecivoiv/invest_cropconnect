<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\APi\HomeApiController;
use App\Http\Controllers\Api\MessageController;
use App\Http\Controllers\APi\CategoryController;
use App\Http\Controllers\Api\LocationController;
use App\Http\Controllers\Api\ReviewController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => ['throttle:api']], function () {

    Route::get('/project/reviews', [ReviewController::class, 'reviews'])
        ->name('api-project.reviews');
});
