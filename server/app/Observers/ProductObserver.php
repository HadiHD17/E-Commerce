<?php

namespace App\Observers;

use App\Models\Product;
use App\Models\ProductNotification;
use App\Models\Notification;

class ProductObserver
{
    public function updated(Product $product)
    {
        if ($product->isDirty('stock') && $product->stock > 0 && $product->getOriginal('stock') <= 0) {
            
            $notifications = ProductNotification::where('product_id', $product->id)
                ->where('notified', false)
                ->get();

            foreach ($notifications as $notification) {
              
                Notification::create([
                    'user_id' => $notification->user_id,
                    'type' => 'product-back',
                    'message' => "{$product->name} is now back in stock!",
                    'is_read' => 0,
                ]);

                $notification->update(['notified' => true]);
            }
        }
    }
}
