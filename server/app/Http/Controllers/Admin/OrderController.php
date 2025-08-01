<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\OrderService;
use Illuminate\Http\Request;
use Exception;

class OrderController extends Controller
{
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

            $result = OrderService::setOrderStatus($orderId);

            if ($result) {
                return $this->responseJSON($result, "Order status updated successfully");
            }

            return $this->responseJSON(null, "Order not found", 404);
        } catch (Exception $e) {
            return $this->responseJSON(null, "Failed to update order status", 500);
        }
    }
}
