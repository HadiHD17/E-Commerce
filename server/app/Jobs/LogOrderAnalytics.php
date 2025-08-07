<?php

namespace App\Jobs;

use App\Models\Order;
use App\Models\OrdersPerHour;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class LogOrderAnalytics implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $order;
    public $tries = 3;
    public $timeout = 30;

    public function __construct(Order $order)
    {
        $this->order = $order;
    }

    public function handle(): void
    {
        try {
            $order = $this->order;
            $hour = Carbon::parse($order->created_at)->format('Y-m-d H:00:00');
            
            $analytics = OrdersPerHour::firstOrCreate(
                ['hour' => $hour],
                ['order_count' => 0, 'revenue' => 0]
            );
            
            $analytics->order_count += 1;
            $analytics->revenue += $order->total_price;
            $analytics->save();

            Log::info('Order analytics logged successfully', [
                'order_id' => $this->order->id,
                'hour' => $hour,
                'order_count' => $analytics->order_count,
                'revenue' => $analytics->revenue
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to log order analytics', [
                'order_id' => $this->order->id,
                'error' => $e->getMessage()
            ]);
            throw $e;
        }
    }
} 