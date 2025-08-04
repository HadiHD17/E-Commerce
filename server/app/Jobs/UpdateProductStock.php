<?php

namespace App\Jobs;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class UpdateProductStock implements ShouldQueue
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
            $order = $this->order->load('orderItems.product');
            
            DB::transaction(function () use ($order) {
                foreach ($order->orderItems as $item) {
                    $product = $item->product;
                    
                    if ($product->stock < $item->quantity) {
                        throw new \Exception("Insufficient stock for product {$product->name}");
                    }
                    
                    $product->stock -= $item->quantity;
                    $product->save();
                    
                    Log::info('Product stock updated', [
                        'product_id' => $product->id,
                        'product_name' => $product->name,
                        'quantity_reduced' => $item->quantity,
                        'new_stock' => $product->stock
                    ]);
                }
            });

            Log::info('All product stocks updated successfully for order', [
                'order_id' => $this->order->id
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to update product stock', [
                'order_id' => $this->order->id,
                'error' => $e->getMessage()
            ]);
            throw $e;
        }
    }
} 