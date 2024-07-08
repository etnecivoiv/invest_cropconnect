<?php


use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventController;
use App\Http\Controllers\LocaleController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\WebPageController;
use App\Http\Controllers\BlogPostController;
use App\Http\Controllers\BlogTagsController;
use App\Http\Controllers\InvestorController;
use App\Http\Controllers\NewsletterController;
use App\Http\Controllers\BlogCategoryController;
use App\Http\Controllers\EventPaymentController;
use App\Http\Controllers\ProjectCategoryController;
use App\Http\Controllers\Auth\SocialLoginController;

Route::patch('set-locale/{locale}', [LocaleController::class, 'update'])->name('set-locale');
Route::get('clear-cache', [App\Http\Controllers\CacheController::class, 'clear'])->name('clear-cache');

Route::get('/', [WebPageController::class, 'home'])->name('home');
Route::get('/about-us', [WebPageController::class, 'about'])->name('about');

Route::get('/contact-us', [ContactController::class, 'index'])->name('contact');
Route::post('/contact-us', [ContactController::class, 'store']);
Route::get('/page/{slug}', [WebPageController::class, 'page'])->name('page');

Route::get('blogs/categories/{slug}', BlogCategoryController::class)->name('blog-categories.show');
Route::get('blogs/tags/{slug}', BlogTagsController::class)->name('blog-tags.show');
Route::apiResource('/blogs', BlogPostController::class);
Route::get('/events/{event}/book', [EventController::class, 'create'])->name('events.book');
Route::get('/events/{event}/book-success', [EventController::class, 'bookSuccess'])->name('events.book.success');
Route::get('/events/{event}/book-ticket', [EventController::class, 'ticket'])->name('events.book.ticket');
Route::apiResource('/events', EventController::class)->only(['index', 'show', 'update']);
Route::apiResource('/event-payments', EventPaymentController::class)->only(['index', 'store']);
Route::get('/event-payments/{status}', [EventPaymentController::class, 'update'])->name('event-payments.update');

Route::get('projects/categories/{slug}', ProjectCategoryController::class)->name('project-categories.show');
Route::apiResource('/projects', ProjectController::class);

Route::group(['middleware' => ['auth', 'web','email_verified', 'kyc_verified']], function () {
    Route::post('/payments', [PaymentController::class, 'store'])->name('payment.store');
    Route::get('/payments', [PaymentController::class, 'index'])->name('payment.index');
    Route::post('/payment/invest', [PaymentController::class, 'subscribe'])->name('payment.subscribe');
    Route::get('/payment/invest/{status}', [PaymentController::class, 'status']);
    Route::post('review', [ReviewController::class, 'store'])->name('review.store');
});

Route::apiResource('/investors', InvestorController::class);
Route::post('/send-mail',              [ContactController::class, 'sendMail'])
    ->name('send.mail');
Route::post('/newsletter', [NewsletterController::class, 'subscribe'])->name('newsletter.subscribe');


//**======================== Payment Gateway Route Group for merchant ====================**//
Route::group(['middleware' => ['auth', 'web']], function () {
    Route::get('/payment/paypal', '\App\Gateway\Paypal@status');
    Route::post('/stripe/payment', '\App\Gateway\Stripe@status')->name('stripe.payment');
    Route::get('/stripe', '\App\Gateway\Stripe@view')->name('stripe.view');
    Route::get('/stripe-pay/success', '\App\Gateway\Stripe@status')->name('stripe.success');
    Route::get('/stripe-pay/fail', '\App\Gateway\Stripe@fail')->name('stripe.fail');
    Route::get('/payment/mollie', '\App\Gateway\Mollie@status');
    Route::post('/payment/paystack', '\App\Gateway\Paystack@status')->name('paystack.status');
    Route::get('/paystack', '\App\Gateway\Paystack@view')->name('paystack.view');
    Route::get('/payment/mercado', '\App\Gateway\Mercado@status')->name('mercadopago.status');
    Route::get('/razorpay/payment', '\App\Gateway\Razorpay@view')->name('razorpay.view');
    Route::post('/razorpay/status', '\App\Gateway\Razorpay@status');
    Route::get('/payment/flutterwave', '\App\Gateway\Flutterwave@status');
    Route::get('/payment/thawani', '\App\Gateway\Thawani@status');
    Route::get('/payment/instamojo', '\App\Gateway\Instamojo@status');
    Route::get('/payment/toyyibpay', '\App\Gateway\Toyyibpay@status');
    Route::get('/manual/payment', '\App\Gateway\CustomGateway@status');
    Route::get('payu/payment', '\App\Gateway\Payu@view')->name('payu.view');
    Route::post('payu/status', '\App\Gateway\Payu@status')->name('payu.status');
});

Route::get('auth/{provider}', [SocialLoginController::class, 'redirectTo']);
Route::get('auth/callback/{provider}', [SocialLoginController::class, 'handleCallback']);

