<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\User as USER;

use function Clue\StreamFilter\fun;

Route::group(['prefix' => 'user', 'as' => 'user.', 'middleware' => ['auth', 'email_verified', 'kyc_verified']], function () {
   // Profile
   Route::put('change-password', [USER\UserPanelController::class, 'updatePassword'])->name('update-password');
   Route::get('account-settings', [USER\UserPanelController::class, 'accountSetting'])->name('account-settings');
   Route::put('account-settings', [USER\UserPanelController::class, 'accountSettingUpdate'])->name('account-settings.update');
   Route::get('change-password', [USER\UserPanelController::class, 'changePassword'])->name('change-password');

   Route::get('dashboard', [USER\DashboardController::class, 'index'])->name('dashboard');


   Route::resource('wallet-transactions', USER\WalletController::class)->only(['index', 'store']);
   Route::post('wallet-transactions/payment/create', [USER\WalletController::class, 'setPayment'])->name('wallet-transactions.payment.create');
   Route::get('wallet-transactions/payment', [USER\WalletController::class, 'viewPayment'])->name('wallet-transactions.payment.index');
   Route::get('wallet-transactions/payment/{status}', [USER\WalletController::class, 'update'])->name('wallet-transactions.status.update');
   Route::get('/profit-returns', USER\ProfitReturnController::class)->name('profit-return');
   Route::resource('investments', USER\InvestmentController::class)->only('index', 'show');
   Route::get('/projects', [USER\ProjectController::class, 'index'])->name('projects.index');
   Route::resource('supports', USER\SupportController::class);
   Route::get('affiliate', [USER\AffiliateController::class, 'index'])->name('affiliate.index');

   Route::resource('event-orders',              User\EventOrderController::class);
   Route::get('event-orders/{eventOrder}/ticket-download',              [USER\EventOrderController::class, 'ticket'])->name('event-orders.ticket-download');



   // kyc verification
   Route::withoutMiddleware('kyc_verified')->group(function () {
      Route::get('kyc/{kyc}/resubmit', [User\KYCVerificationController::class, 'resubmit'])->name('kyc.resubmit');
      Route::post('kyc/{kyc}/resubmit', [User\KYCVerificationController::class, 'resubmitUpdate']);
      Route::resource('kyc', User\KYCVerificationController::class);
   });


   Route::get('notifications', [USER\UserPanelController::class, 'userNotifications'])->name('notifications');
   Route::post('notifications/{notification}', [USER\UserPanelController::class, 'userNotificationsRead'])->name('notifications.read');
   // payouts
   Route::get('/payout/setup/{method_id}',    [USER\PayoutController::class, 'setup'])->name('payout-setup');
   Route::post('/payout/sentotp/{method_id}', [USER\PayoutController::class, 'sentOtp'])->name('payout.otp');
   Route::get('/payout/confirmation',         [USER\PayoutController::class, 'confirmation'])->name('payout.confirmation');
   Route::resource('payout',                   USER\PayoutController::class);
   Route::post('/payout/make-request',        [USER\PayoutController::class, 'makeRequest'])->name('payout.otp.verify');
   Route::get('/payouts/logs',                [USER\PayoutController::class, 'logs'])->name('payout.logs');
   Route::get('/payout-track/{invoice_no}',   [USER\PayoutController::class, 'invoice'])->name('payout.details');
});
