<?php

namespace App\Jobs;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class SendWebhookNotification implements ShouldQueue
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
            
            $payload = [
                'order_id' => $order->id,
                'user_id' => $order->user_id,
                'status' => $order->status,
                'total_price' => $order->total_price,
                'created_at' => $order->created_at,
                'items' => $order->orderItems->map(function ($item) {
                    return [
                        'product_id' => $item->product_id,
                        'product_name' => $item->product->name,
                        'quantity' => $item->quantity,
                        'price_at_time' => $item->price_at_time
                    ];
                }),
                'webhook_type' => 'order_created'
            ];

            // Try to send webhook, but don't fail the job if server is not available
            try {
                $response = Http::timeout(5)->post('http://127.0.0.1:8000/api/webhook/order', $payload);
                
                if ($response->successful()) {
                    Log::info('Webhook notification sent successfully', [
                        'order_id' => $this->order->id,
                        'response_status' => $response->status()
                    ]);
                } else {
                    Log::warning('Webhook failed with status: ' . $response->status(), [
                        'order_id' => $this->order->id
                    ]);
                }
            } catch (\Exception $webhookException) {
                // Log the webhook failure but don't fail the entire job
                Log::warning('Webhook server not available, skipping webhook notification', [
                    'order_id' => $this->order->id,
                    'error' => $webhookException->getMessage()
                ]);
            }

            // Job completed successfully even if webhook failed
            Log::info('Webhook job completed', [
                'order_id' => $this->order->id
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to process webhook job', [
                'order_id' => $this->order->id,
                'error' => $e->getMessage()
            ]);
            throw $e;
        }
    }
} 