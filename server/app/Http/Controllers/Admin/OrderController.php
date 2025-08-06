<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\OrderService;
use App\Services\Admin\AuditLogService;
use Illuminate\Http\Request;
use Exception;

class OrderController extends Controller
{
    public function getAllOrders(Request $request)
    {
        try {
            $filters = [
                'status' => $request->get('status'),
                'start_date' => $request->get('start_date'),
                'end_date' => $request->get('end_date'),
                'user_id' => $request->get('user_id'),
                'order_id' => $request->get('order_id'),
                'per_page' => $request->get('per_page', 15),
                'page' => $request->get('page', 1),
            ];

            $orders = OrderService::getAllOrders($filters);
            return $this->responseJSON($orders);
        } catch (Exception $e) {
            return $this->responseJSON(null, "Failed to retrieve orders", 500);
        }
    }

    public function getTodaysOrders()
    {
        try {
            $orders = OrderService::getTodaysOrders();
            return $this->responseJSON($orders);
        } catch (Exception $e) {
            return $this->responseJSON(null, "Failed to retrieve today's orders", 500);
        }
    }

    public function getTodaysRevenue()
    {
        try {
            $revenue = OrderService::getTodaysRevenue();
            return $this->responseJSON($revenue);
        } catch (Exception $e) {
            return $this->responseJSON(null, "Failed to retrieve today's revenue", 500);
        }
    }

    public function getRevenue(Request $request)
    {
        try {
            $startDate = $request->get('start_date');
            $endDate = $request->get('end_date');

            $revenue = OrderService::getRevenue($startDate, $endDate);
            return $this->responseJSON($revenue);
        } catch (Exception $e) {
            return $this->responseJSON(null, "Failed to retrieve revenue data", 500);
        }
    }

    public function setOrderStatus($orderId)
    {
        try {
            $order = \App\Models\Order::find($orderId);
            $oldStatus = $order ? $order->status : null;

            $result = OrderService::setOrderStatus($orderId);

            if ($result) {
                // Log the audit action
                AuditLogService::logAction(
                    auth()->id(),
                    'order_status_changed',
                    'Order',
                    $orderId,
                    $oldStatus,
                    $result->status
                );

                return $this->responseJSON($result, "Order status updated successfully");
            }

            return $this->responseJSON(null, "Order not found", 404);
        } catch (Exception $e) {
            return $this->responseJSON(null, "Failed to update order status", 500);
        }
    }

    public function cancelOrder($orderId)
    {
        try {
            $order = \App\Models\Order::find($orderId);
            $oldStatus = $order ? $order->status : null;

            $result = OrderService::cancelOrder($orderId);

            if ($result) {
                // Log the audit action
                AuditLogService::logAction(
                    auth()->id(),
                    'order_cancelled',
                    'Order',
                    $orderId,
                    $oldStatus,
                    $result->status
                );

                if ($result->status === 'cancelled' && $result->getOriginal('status') === 'cancelled') {
                    return $this->responseJSON($result, "Order is already cancelled");
                }
                
                return $this->responseJSON($result, "Order cancelled successfully");
            }

            if (!$order) {
                return $this->responseJSON(null, "Order not found", 404);
            }

            if ($order->status === 'shipped') {
                return $this->responseJSON(null, "Cannot cancel shipped orders", 400);
            }

            return $this->responseJSON(null, "Failed to cancel order", 500);
        } catch (Exception $e) {
            return $this->responseJSON(null, "Failed to cancel order", 500);
        }
    }
}
