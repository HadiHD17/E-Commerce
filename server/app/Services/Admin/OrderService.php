<?php

namespace App\Services\Admin;

use App\Events\OrderStatusUpdated;
use App\Models\Order;
use App\Models\OrderItem;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class OrderService
{
    /**
     * Get today's orders
     */
    public static function getTodaysOrders()
    {
        $today = Carbon::today();

        return Order::with(['user', 'orderItems.product'])
            ->whereDate('created_at', $today)
            ->orderBy('created_at', 'desc')
            ->get();
    }

    /**
     * Get today's revenue
     */
    public static function getTodaysRevenue()
    {
        $today = Carbon::today();

        $revenue = Order::whereDate('created_at', $today)
            ->where('status', '!=', 'cancelled')
            ->sum('total_price');

        return [
            'date' => $today->format('Y-m-d'),
            'revenue' => $revenue,
            'currency' => 'USD'
        ];
    }

    /**
     * Get revenue for a date range
     */
    public static function getRevenue($startDate = null, $endDate = null)
    {
        $query = Order::where('status', '!=', 'cancelled');

        if ($startDate) {
            $query->whereDate('created_at', '>=', $startDate);
        }

        if ($endDate) {
            $query->whereDate('created_at', '<=', $endDate);
        }

        $revenue = $query->sum('total_price');

        return [
            'start_date' => $startDate,
            'end_date' => $endDate,
            'revenue' => $revenue,
            'currency' => 'USD'
        ];
    }

    /**
     * Set order status
     */
    public static function setOrderStatus($orderId)
    {
        $order = Order::find($orderId);

        if (!$order) {
            return null;
        }

        $statuses = ['pending', 'paid', 'packed', 'shipped'];
        $currentStatus = $order->status;
        $currentIndex = array_search($currentStatus, $statuses);

        if ($currentIndex === false || $currentIndex === count($statuses) - 1) {
            return $order->load(['user', 'orderItems.product']); // Already at final status
        }

        $nextStatus = $statuses[$currentIndex + 1];
        $previousStatus = $order->status;
        $order->status = $nextStatus;
        $order->save();

        // Fire the OrderStatusUpdated event
        event(new OrderStatusUpdated($order, $previousStatus));

        return $order->load(['user', 'orderItems.product']);
    }

    /**
     * Cancel order
     */
    public static function cancelOrder($orderId)
    {
        $order = Order::find($orderId);

        if (!$order) {
            return null;
        }

        if ($order->status === 'cancelled') {
            return $order->load(['user', 'orderItems.product']);
        }

        if ($order->status === 'shipped') {
            return null;
        }

        $previousStatus = $order->status;
        $order->status = 'cancelled';
        $order->save();

        // Fire the OrderStatusUpdated event
        event(new OrderStatusUpdated($order, $previousStatus));

        return $order->load(['user', 'orderItems.product']);
    }
}
