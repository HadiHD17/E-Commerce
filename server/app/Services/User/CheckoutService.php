<?php

namespace App\Services\User;

use App\Events\OrderCreated;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Support\Facades\DB;

class CheckoutService
{
    static function processCheckout(int $userId)
    {
        return DB::transaction(function () use ($userId) {

            $cartItems = CartItem::where('user_id', $userId)->get();

            if ($cartItems->isEmpty()) {
                throw new \Exception('Cart is empty');
            }

            $total = 0;

            $order = new Order();
            $order->user_id = $userId;
            $order->total_price = 0;
            $order->save();

            foreach ($cartItems as $cartItem) {
                $product = Product::find($cartItem->product_id);
                if (!$product || $product->stock < $cartItem->quantity) {
                    throw new \Exception('Product not available or insufficient stock');
                }

                $total += $product->price * $cartItem->quantity;

                $orderItem = new OrderItem();
                $orderItem->order_id = $order->id;
                $orderItem->product_id = $cartItem->product_id;
                $orderItem->quantity = $cartItem->quantity;
                $orderItem->price_at_time = $product->price;
                $orderItem->save();

                $product->decrement('stock', $cartItem->quantity);
            }

            $order->total_price = $total;
            $order->save();

            CartItem::where('user_id', $userId)->delete();

            // Fire the OrderCreated event
            event(new OrderCreated($order));

            return $order;
        });
    }
}
