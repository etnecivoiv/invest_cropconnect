<?php

namespace App\Http\Controllers\Cron;

use App\Http\Controllers\Controller;
use App\Models\Invest;
use App\Models\ReturnSchedule;
use App\Models\ReturnTransaction;
use Illuminate\Http\Request;

class ReturnScheduleController extends Controller
{
    public function investProfitCalculation()
    {

        $returnSchedules = ReturnSchedule::query()
            ->whereDate('return_date', '<=', today())
            ->where('status', 0)
            ->get();

        $returnTransactions = [];
        foreach ($returnSchedules as $returnSchedule) {
            $invests = Invest::where('project_duration_id', $returnSchedule->project_duration_id)
                ->where('status', 1)
                ->with('user')
                ->get();

            foreach ($invests as $invest) {
                $calculatedAmount = $returnSchedule->amount;

                if ($returnSchedule->return_type == 'percent') {
                    $calculatedAmount = round(($invest->amount * $returnSchedule->amount) / 100, 2);
                }

                $type = 0; // loss
                if ($returnSchedule->profit_type == 'profit') {
                    $invest->user()->increment('wallet', $calculatedAmount);
                    $type = 1; // 'profit'
                } elseif ($returnSchedule->profit_type == 'loss') {
                    if ($invest->user->wallet && $invest->user->wallet >= $calculatedAmount) {
                        $invest->user()->decrement('wallet', $calculatedAmount);
                    } elseif ($invest->user->wallet < $calculatedAmount) {
                        $invest->amount -= $calculatedAmount;
                        $invest->save();
                    }
                }

                $returnTransactions[] = [
                    'project_duration_id' => $returnSchedule->project_duration_id,
                    'return_schedule_id' => $returnSchedule->id,
                    'user_id' => $invest->user_id,
                    'amount' => $calculatedAmount,
                    'status' => 1,
                    'type' => $type,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
            $returnSchedule->status = 1;
            $returnSchedule->save();
        }
        ReturnTransaction::insert($returnTransactions);
        return "invest profit calculation cron job executed";
    }
}
