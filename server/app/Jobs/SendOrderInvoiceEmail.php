<?php

namespace App\Jobs;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class SendOrderInvoiceEmail implements ShouldQueue
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
            $order = $this->order->load(['user', 'orderItems.product']);
            
            Mail::send('emails.order-invoice', [
                'order' => $order,
                'user' => $order->user
            ], function ($message) use ($order) {
                $message->to($order->user->email)
                        ->subject('Order Invoice - Order #' . $order->id);
            });

            Log::info('Order invoice email sent successfully', [
                'order_id' => $this->order->id,
                'user_email' => $order->user->email
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to send order invoice email', [
                'order_id' => $this->order->id,
                'error' => $e->getMessage()
            ]);
            throw $e;
        }
    }
} 