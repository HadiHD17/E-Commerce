<?php

namespace App\Services;

use App\Models\Order;
use App\Events\OrderCreated;
use App\Events\OrderStatusUpdated;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Redis;

class BroadcastingService
{
    /**
     * Broadcast order created event
     *
     * @param Order $order
     * @return void
     */
    static function broadcastOrderCreated(Order $order)
    {
        $data = [
            'event' => 'order_created',
            'data' => $order->load(['user', 'orderItems.product'])->toArray(),
            'timestamp' => now()->toISOString()
        ];

        // Broadcast to Redis channels
        Redis::publish('orders', json_encode($data));
        Redis::publish("user.{$order->user_id}.orders", json_encode($data));
        
        // Also fire the Laravel event
        event(new OrderCreated($order));
    }

    /**
     * Broadcast order status updated event
     *
     * @param Order $order
     * @param string|null $previousStatus
     * @return void
     */
    static function broadcastOrderStatusUpdated(Order $order, $previousStatus = null)
    {
        $data = [
            'event' => 'order_status_updated',
            'data' => $order->load(['user', 'orderItems.product'])->toArray(),
            'previous_status' => $previousStatus,
            'timestamp' => now()->toISOString()
        ];

        // Broadcast to Redis channels
        Redis::publish('orders', json_encode($data));
        Redis::publish("user.{$order->user_id}.orders", json_encode($data));
        Redis::publish('admin.orders', json_encode($data));
        
        // Also fire the Laravel event
        event(new OrderStatusUpdated($order, $previousStatus));
    }

    /**
     * Get broadcasting channels for user
     *
     * @param int $userId
     * @param string $role
     * @return array
     */
    static function getUserChannels($userId, $role)
    {
        $channels = [];

        if ($role === 'customer') {
            $channels[] = 'orders';
            $channels[] = "user.{$userId}.orders";
        }

        if ($role === 'admin') {
            $channels[] = 'admin.orders';
        }

        return $channels;
    }

    /**
     * Check if broadcasting is enabled
     *
     * @return bool
     */
    static function isBroadcastingEnabled()
    {
        return config('broadcasting.default') !== 'null';
    }
} 