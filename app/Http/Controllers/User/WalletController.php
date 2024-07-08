<?php

namespace App\Http\Controllers\User;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Gateway;
use App\Models\Notification;
use Illuminate\Http\Request;
use App\Models\WalletTransaction;
use App\Http\Controllers\Controller;
use App\Services\PageHeader;
use App\Traits\Uploader;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;

class WalletController extends Controller
{
    use Uploader;
    public function index()
    {

        PageHeader::set()
            ->title('Wallet balance')
            ->buttons([
                [
                    'name' => '<i class="fa fa-plus"></i>&nbsp' . __('Make Deposit'),
                    'url' => '#',
                    'target' => '#makeDepositDrawer',
                ]
            ]);

        /**
         * @var \App\Models\User
         */
        $user = auth()->user();

        $histories = $user->walletTransactions()->with('gateway:id,name')
            ->when(request('type') == 'tnx', fn ($q) => $q->where('payment_id', 'LIKE', '%' . request('search') . '%'))
            ->paginate();
        $walletBalance = $user->wallet ?? 0;

        return Inertia::render('User/Wallet/Index', compact('histories', 'walletBalance'));
    }


    public function setPayment(Request $request)
    {
        $request->validate([
            'amount' => ['required', 'numeric', 'min:1']
        ]);

        Session::forget('payment_info');
        Session::forget('call_back');
        Session::put('total_amount', $request->amount);
        return Inertia::location(route('user.wallet-transactions.payment.index'));
    }

    public function viewPayment()
    {
        $viewData = [
            'gateways' => Gateway::select('id', 'name', 'currency', 'logo', 'charge', 'multiply', 'min_amount', 'max_amount', 'is_auto', 'status', 'image_accept', 'phone_required', 'comment')->where('status', 1)->get(),
            'total' => floatval(session()->get('total_amount', 0)),
            'error' => Session::has('error'),
            'minMax' => Session::has('min-max'),
            'minMaxMessage' => Session::get('min-max', ''),
            'user' => auth()->user(),
            'logo' => get_option('primary_data', true)?->logo ?? '',
            'invoice_data' => get_option('invoice_data', true),
        ];

        return Inertia::render('User/Wallet/Payment', $viewData);
    }

    public function store(Request $request)
    {
        $gateway  = Gateway::where('status', 1)->findOrFail($request->gateway_id);
        $total  = Session::get('total_amount');
        $subTotal  = ($total * $gateway->multiply) + $gateway->charge;

        if ($gateway->min_amount > $subTotal) {
            Session::flash('min-max', __('The minimum transaction amount is ' . $gateway->min_amount));
            return redirect()->back();
        }
        if ($gateway->max_amount != -1) {
            if ($gateway->max_amount < $subTotal) {
                Session::flash('min-max', __('The maximum transaction amount is ' . $gateway->max_amount));
                return redirect()->back();
            }
        }

        if ($gateway->is_auto == 0) {
            $request->validate([
                'manualPayment.comment' => ['required', 'string', 'max:500'],
                'manualPayment.image' => ['required', 'image', 'max:2048'], // 2MB
            ]);

            $payment_data['comment'] = $request->input('manualPayment.comment');
            $image = $this->saveFile($request, 'manualPayment.image');
            $payment_data['screenshot'] = $image;
            $payment_data['comment'] = $request->input('manualPayment.comment');
        }

        $payment_data['currency']   = $gateway->currency ?? 'USD';
        $payment_data['email']      = auth()->user()->email;
        $payment_data['name']       = auth()->user()->name;
        $payment_data['phone']      = $request->phone;
        $payment_data['billName']   = 'Make deposit';
        $payment_data['amount']     = $total;
        $payment_data['test_mode']  = $gateway->test_mode;
        $payment_data['charge']     = $gateway->charge ?? 0;
        $payment_data['pay_amount'] =  number_format($subTotal, 0, '.', '');
        $payment_data['getway_id']  = $gateway->id;
        $callback['success'] = route('user.wallet-transactions.status.update', 'success');
        $callback['fail'] = route('user.wallet-transactions.status.update', 'failed');

        Session::put('call_back', $callback);

        if (!empty($gateway->data)) {
            foreach (json_decode($gateway->data ?? '') ?? [] as $key => $info) {
                $payment_data[$key] = $info;
            };
        }

        return $gateway->namespace::make_payment($payment_data);
    }

    public function update($status)
    {
        abort_if(!Session::has('call_back'), 404);
        return $status == 'success' ? $this->success() : $this->failed();
    }

    private function success()
    {
        abort_if(!Session::has('payment_info'), 404);

        $paymentInfo = Session::get('payment_info');

        Session::forget('payment_info');
        Session::forget('call_back');

        /**
         * @var \App\Models\User
         */
        $user = auth()->user();

        DB::transaction(function () use ($paymentInfo, $user) {
            if ($paymentInfo['status'] == 1) {
                $user->wallet =  $user->wallet + $paymentInfo['amount'];
                $user->save();
            }

            $deposit =  WalletTransaction::create([
                'user_id' => auth()->id(),
                'gateway_id' => $paymentInfo['getway_id'],
                'payment_id' => $paymentInfo['payment_id'],
                'amount' => $paymentInfo['amount'],
                'status' => $paymentInfo['status'],
                'meta' => isset($paymentInfo['meta'])  ? json_encode($paymentInfo['meta']) : '',
            ]);

            Notification::create([
                'user_id' => auth()->id(),
                'title' => __('New Deposit'),
                'is_admin' => 1,
                'url' => url('/admin/deposit-logs/' . $deposit->id),
                'comment' => __('An User has recharged his wallet'),
            ]);
        });


        $message = $paymentInfo['status'] == 1 ? __('Your deposit payment is complete') : __('Your deposit payment is complete admin will review this payment manually for approval.');

        Session::flash('success', $message);

        return to_route('user.wallet-transactions.index');
    }

    private function failed()
    {
        Session::forget('payment_info');
        Session::forget('call_back');
        Session::flash('error', true);

        $message = __('Your deposit payment request is failed');

        Session::flash('error', $message);
        return to_route('user.wallet-transactions.index');
    }
}
