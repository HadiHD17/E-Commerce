<?php

namespace App\Jobs;

use App\Models\Order;
use App\Models\SmsLog;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class SendSMSNotification implements ShouldQueue
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
            $order = $this->order->load('user');
            
            $message = "Order #{$order->id} has been placed successfully. Total: $" . number_format($order->total_price, 2);
            
            SmsLog::create([
                'phone_number' => $order->user->phone ?? 'N/A',
                'message' => $message,
                'status' => 'sent'
            ]);

            Log::info('SMS notification sent', [
                'order_id' => $this->order->id,
                'phone_number' => $order->user->phone ?? 'N/A',
                'message' => $message
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to send SMS notification', [
                'order_id' => $this->order->id,
                'error' => $e->getMessage()
            ]);
            throw $e;
        }
    }
} 