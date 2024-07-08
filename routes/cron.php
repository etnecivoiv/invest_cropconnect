<?php

use App\Http\Controllers\Cron\CronController;
use App\Http\Controllers\Cron\ReturnScheduleController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'cron', 'as' => 'cron.'], function () {

    Route::get('/invest-profit-calculation', [ReturnScheduleController::class, 'investProfitCalculation']);
});
