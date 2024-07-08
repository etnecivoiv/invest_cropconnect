<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin as ADMIN;

Route::group(['prefix' => 'admin', 'as' => 'admin.', 'middleware' => ['auth', 'admin']], function () {

	// Default Routes
	Route::get('dashboard', ADMIN\DashboardController::class)->name('dashboard');
	Route::resource('role', ADMIN\RoleController::class);
	Route::resource('admin', ADMIN\AdminController::class);
	Route::resource('order', ADMIN\OrderController::class);
	Route::resource('gateways', ADMIN\GatewayController::class);
	Route::get('cron-job', ADMIN\CronjobController::class);
	Route::resource('page', ADMIN\PageController::class);
	Route::post('language/addkey', [ADMIN\LanguageController::class, 'addKey']);
	Route::resource('language', ADMIN\LanguageController::class);
	Route::resource('menu', ADMIN\MenuController::class);
	Route::patch('/menu-data/{id}', [ADMIN\MenuController::class, 'updateData'])->name('menu.data.update');
	Route::post('/menu-update/{id}', [ADMIN\MenuController::class, 'storeDate'])->name('menu.content.update');

	Route::get('page-settings', [ADMIN\SettingsController::class, 'index'])->name('page-settings.index');
	Route::post('page-settings/{id}', [ADMIN\SettingsController::class, 'update'])->name('page-settings.update');


	Route::resource('seo', ADMIN\SeoController::class);
	Route::resource('support', ADMIN\SupportController::class);
	Route::resource('notification', ADMIN\NotifyController::class);
	Route::resource('team', ADMIN\TeamController::class);
	Route::resource('customers', ADMIN\CustomerController::class);
	Route::resource('investors', ADMIN\InvestorController::class);
	Route::resource('features', ADMIN\FeaturesController::class);
	Route::resource('testimonials', ADMIN\TestimonialsController::class);
	Route::resource('faq', ADMIN\FaqController::class);
	Route::resource('events/{event}/participants', ADMIN\EventParticipantController::class)->only(['index', 'destroy']);
	Route::resource('events', ADMIN\EventController::class);
	Route::resource('event-orders', ADMIN\EventOrderController::class);
	Route::get('event-orders/{eventOrder}/ticket-download', [ADMIN\EventOrderController::class, 'ticket'])->name('event-orders.ticket-download');
	Route::get('refer-histories', ADMIN\ReferHistoryController::class)->name('refer-histories');
	Route::get('referral-commissions', [ADMIN\ReferralCommissionController::class, 'index'])->name('commission-histories');
	Route::put('referral-commissions/{id}', [ADMIN\ReferralCommissionController::class, 'update'])->name('commission-histories.update');

	Route::get('header-notifications', [ADMIN\AdminController::class, 'adminNotifications'])->name('notifications');
	Route::post('header-notifications/{notification}', [ADMIN\AdminController::class, 'adminNotificationsRead'])->name('notifications.read');

	// Blog
	Route::resource('blog-posts', ADMIN\BlogPostController::class);
	Route::resource('blog-categories', ADMIN\BlogCategoryController::class);
	Route::resource('blog-tags', ADMIN\BlogTagController::class);

	// Settings
	Route::resource('developer-settings', ADMIN\DeveloperSettingsController::class);
	Route::resource('partner', ADMIN\PartnerController::class);
	Route::resource('update', ADMIN\UpdateController::class);
	Route::put('option-update/{key}', [ADMIN\OptionController::class, 'update'])->name('option.update');

	// Profile
	Route::get('profile', [ADMIN\ProfileController::class, 'settings'])->name('profile.setting');
	Route::put('profile/update/{type}', [ADMIN\ProfileController::class, 'update'])->name('profile.update');

	// KYC
	Route::post('/kyc-method/mass-destroy', [ADMIN\KycMethodController::class, 'massDestroy'])->name('kyc-methods.mass-destroy');
	Route::resource('kyc-methods', ADMIN\KycMethodController::class);
	Route::delete('kyc-requests/destroy/mass', [ADMIN\KYCRequestController::class, 'destroyMass'])->name('kyc-requests.destroy.mass');
	Route::resource('kyc-requests', ADMIN\KYCRequestController::class);

	// Project
	Route::resource('project-categories', ADMIN\ProjectCategoryController::class)->except(['create', 'show', 'edit']);
	Route::resource('projects', ADMIN\ProjectController::class);
	Route::resource('projects/{project}/return-schedules', ADMIN\ProjectReturnScheduleController::class);

	Route::get('/return-transaction', ADMIN\ReturnTransactionController::class)->name('return-transaction');
	Route::resource('/invests', ADMIN\InvestController::class)->only(['index', 'update'])
		->names('invest');
	// deposit
	Route::resource('deposit-logs', ADMIN\DepositController::class)->only(['index', 'show', 'update']);

	// Payouts
	Route::resource('payout-methods', ADMIN\PayoutMethodController::class);
	Route::post('payout-methods/delete-all', [ADMIN\PayoutMethodController::class, 'deleteAll'])->name('payout-methods.delete');
	Route::post('payouts/delete-all', [ADMIN\PayoutController::class, 'deleteAll'])->name('payouts.delete');
	Route::get('payouts/approved', [ADMIN\PayoutController::class, 'approved'])->name('payouts.approved');
	Route::get('payouts/reject', [ADMIN\PayoutController::class, 'reject'])->name('payouts.reject');
	Route::resource('payouts', ADMIN\PayoutController::class);
});
