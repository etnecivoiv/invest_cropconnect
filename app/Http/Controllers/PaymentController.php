<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Order;
use App\Models\Invest;
use App\Models\Gateway;
use App\Models\Project;
use App\Traits\Uploader;
use App\Models\OrderItem;
use App\Models\Notification;
use Illuminate\Http\Request;
use App\Models\CommissionHistory;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class PaymentController extends Controller
{
    use Uploader;
    public function index()
    {
        $invest_data = session()->get('invest_data');
        $project = Project::where('status', 1)->where('id', $invest_data['project'])->first();
        $durations = $project->durations()->whereIn('id', $invest_data['durations'])->get();
        if (empty ($project)) {
            Session::flash('saas_error', __('Please select a project from here'));
            return redirect('/projects');
        }
        $gateways = Gateway::where('status', 1)->select('id', 'name', 'currency', 'logo', 'charge', 'multiply', 'min_amount', 'max_amount', 'is_auto', 'image_accept', 'test_mode', 'status', 'phone_required', 'comment')->get();

        $total =  $invest_data['unit_price'] * ($invest_data['qty'] * count($invest_data['durations']));
        $tax = get_option('tax',true);

        if($tax['tax'] > 0){

            $tax = ($tax['tax'] / 100) * $total;
            $total = $total+$tax;
        }



        $invoice_data = get_option('invoice_data', true);
        Session::forget('payment_info');
        Session::forget('call_back');
        Session::forget('plan_id');

        $error = Session::has('error');
        $minMax = Session::has('min-max');
        return Inertia::render('Web/Payment', [
            'project' => $project,
            'gateways' => $gateways,
            'tax' => $tax,
            'total' => $total,
            'invoice_data' => $invoice_data,
            'invest_data' => $invest_data,
            'error' => $error,
            'minMax' => $minMax,
            'minMaxMessage' => $minMax ? Session::get('min-max') : '',
            'user' => auth()->user(),
            'qty' => $invest_data['qty'],
            'logo' => get_option('primary_data', true, true)->logo ?? '',
            'durations' => $durations,
        ]);
    }

    public function store(Request $request)
    {

        $project = Project::findOrFail($request->get('project'));
        $requestUnits = $request->get('qty') * count($request->get('durations'));
        $availableUnits = $project->total_units - $project->invests()->count();
        if ($availableUnits < $requestUnits) {
            return back()->withErrors(['not_enough_balance' => __('Only :availableUnits units are available, you selected total :requestUnits units', ['availableUnits' => $availableUnits, 'requestUnits' => $requestUnits])]);
        }

        if ($request->get('by_wallet')) {
            return $this->orderByWallet($request);
        }

        session()->put('invest_data', $request->all());
        return to_route('payment.index');
    }

    public function subscribe(Request $request)
    {
        $invest_data = session()->get('invest_data');
        $project = Project::where('status', 1)->findOrFail($request->project_id);

        $requestUnits = session()->get('invest_data.qty') * count(session()->get('invest_data.durations'));
        $availableUnits = $project->total_units - $project->invests()->count();
        if ($availableUnits < $requestUnits) {
            return back()->withErrors(['not_enough_balance' => __('Only :availableUnits units are available, you selected total :requestUnits units', ['availableUnits' => $availableUnits, 'requestUnits' => $requestUnits])]);
        }


        $gateway = Gateway::where('status', 1)->findOrFail($request->gateway_id);

        $total = $invest_data['unit_price'] * ($invest_data['qty'] * count($invest_data['durations']));
        $tax = get_option('tax');

        if($tax['tax'] > 0){

            $tax = ($tax['tax'] / 100) * $total;
            $total = $total+$tax;
        }

        $payable = $total * $gateway->multiply + $gateway->charge;

        if ($gateway->min_amount > $payable) {
            Session::flash('min-max', __('The minimum transaction amount is ' . $gateway->min_amount));
            return redirect()->back();
        }
        if ($gateway->max_amount != -1) {
            if ($gateway->max_amount < $payable) {
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

        Session::put('project_id', $project->id);

        $payment_data['currency'] = $gateway->currency ?? 'USD';
        $payment_data['email'] = Auth::user()->email;
        $payment_data['name'] = Auth::user()->name;
        $payment_data['phone'] = $request->phone;
        $payment_data['billName'] = 'Project Name: ' . $project->title;
        $payment_data['amount'] = $total;
        $payment_data['test_mode'] = $gateway->test_mode;
        $payment_data['charge'] = $gateway->charge ?? 0;
        $payment_data['pay_amount'] = str_replace(',', '', number_format($payable));
        $payment_data['getway_id'] = $gateway->id;
        $callback['success'] = url('/payment/invest/success');
        $callback['fail'] = url('/payment/invest/failed');
        Session::put('call_back', $callback);

        if (!empty ($gateway->data)) {
            foreach (json_decode($gateway->data ?? '') ?? [] as $key => $info) {
                $payment_data[$key] = $info;
            }
            ;
        }

        return $gateway->namespace::make_payment($payment_data);
    }

    public function status($status)
    {
        abort_if(!Session::has('call_back') || !Session::has('invest_data'), 404);

        return $status == 'success' ? $this->success() : $this->failed();
    }

    public function success()
    {
        abort_if(!Session::has('payment_info'), 404);

        $paymentInfo = Session::get('payment_info');

        Session::forget('payment_info');
        Session::forget('call_back');

        $invest_data = session()->get('invest_data');
        $project = Project::where('status', 1)->findOrFail(Session::get('project_id'));
        Session::forget('project_id');

        $redirectUrl = '/user/investments';



        $tax = get_option('tax',true);
        $paymentInfo['amount'] = $invest_data['qty'] * $invest_data['unit_price'];

        if($tax['tax'] > 0){


            $tax = ($tax['tax'] / 100) * $paymentInfo['amount'];




        }
        else{
            $tax = 0;
        }

        $order = new Order();
        $order->project_id = $project->id;
        $order->payment_id = $paymentInfo['payment_id'];
        $order->user_id = Auth::id();
        $order->gateway_id = $paymentInfo['getway_id'];
        $order->amount = $paymentInfo['amount'];
        $order->tax = $tax;
        $order->status = $paymentInfo['status'] ?? 1;
        if (isset ($paymentInfo['meta'])) {
            $order->meta = json_encode($paymentInfo['meta']);
        }

        try {
            DB::beginTransaction();

            $order->save();


            if ($paymentInfo['status'] == 1) {
                foreach ($invest_data['durations'] as $duration) {
                    $invest = Invest::create([
                        'order_id' => $order->id,
                        'project_id' => $project->id,
                        'project_duration_id' => $duration,
                        'qty' => $invest_data['qty'],
                        'user_id' => Auth::id(),
                        'amount' => $invest_data['qty'] * $invest_data['unit_price'],
                        'next_payment_date' => $project->nextPaymentDate()
                    ]);

                    Notification::create([
                        'user_id' => auth()->id(),
                        'title' => __('New Invest'),
                        'url' => route('admin.invest.index', $invest->id),
                        'comment' => __('An User has Invest to a project'),
                        'is_admin' => 1
                    ]);
                }
            }

            $message = $paymentInfo['status'] == 1 ? __('Your Investment is complete') : __('Your Investment is complete admin will review this payment manually for approval.');

            $uplink_id = auth()->user()->uplink_id;



            if ($uplink_id != null) {
                $referCommissionPercent = get_option('affiliate_commission_percent');
                $commissionAmount = ($order->amount * $referCommissionPercent) / 100;

                $history = new CommissionHistory();
                $history->user_id = $uplink_id;
                $history->order_id = $order->id;
                $history->order_amount = $order->amount;
                $history->commission_amount = $commissionAmount;
                $history->status = 0;
                $history->save();
            }

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            return $th;
        }


        Session::forget('invest_data');

        if ($paymentInfo['status'] == 1) {
            return redirect($redirectUrl);
        }

        return to_route('user.investments.index');
    }

    public function failed()
    {
        Session::forget('payment_info');
        Session::forget('call_back');
        Session::forget('project_id');
        Session::forget('invest_data');

        Session::flash('error', true);

        return to_route('user.investments.index');
    }

    public function orderByWallet(Request $request)
    {
        $invest_data = $request->all();
        $project = Project::where('status', 1)->where('id', $invest_data['project'])->first();

        if (empty ($project)) {
            Session::flash('saas_error', __('Please select a project from here'));
            return Inertia::location('/projects');
        }

        $tax = get_option('tax', true);
        $tax = $tax > 0 ? $tax : 0;

        $total =  $invest_data['unit_price'] * ($invest_data['qty'] * count($invest_data['durations']));

        /**
         * @var \App\Models\User
         */
        $user = auth()->user();
        $userWalletBalance = $user->wallet;

        if ($userWalletBalance < $total) {
            return back()->withErrors(['not_enough_balance' => __('Not enough wallet balance, please recharge your wallet first!')]);
        }

        $order = new Order();
        $order->project_id = $project->id;
        $order->payment_id = null;
        $order->user_id = $user->id;
        $order->gateway_id = null;
        $order->amount = $total;
        $order->tax = $tax['tax']; // ito po yung nabago
        $order->status = 2;
        // ($order)dd;
        try {
            DB::beginTransaction();
            $order->save();

            foreach ($invest_data['durations'] as $duration) {
                $invest = Invest::create([
                    'order_id' => $order->id,
                    'project_id' => $project->id,
                    'project_duration_id' => $duration,
                    'qty' => $invest_data['qty'],
                    'user_id' => Auth::id(),
                    'amount' => $invest_data['qty'] * $invest_data['unit_price'],
                    'next_payment_date' => $project->nextPaymentDate()
                ]);

                Notification::create([
                    'user_id' => auth()->id(),
                    'title' => __('New Invest'),
                    'url' => route('admin.invest.index'),
                    'comment' => __('An User has Invest to a project'),
                    'is_admin' => 1
                ]);
            }


            if ($uplink_id = $user->uplink_id) {
                $referCommissionPercent = get_option('affiliate_commission_percent') ?? 0;

                if ($referCommissionPercent > 0) {
                    $commissionAmount = ($order->amount * $referCommissionPercent) / 100;
                    $history = new CommissionHistory();
                    $history->user_id = $uplink_id;
                    $history->order_id = $order->id;
                    $history->order_amount = $order->amount;
                    $history->commission_amount = $commissionAmount;
                    $history->status = 0;
                    $history->save();
                }
            }

            $user->wallet = $user->wallet - $total - $tax['tax'];
            $user->save();

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();

        }

        Session::flash('success', __('Your Investment is pending'));

        return Inertia::location(route('user.investments.index'));
    }
}
