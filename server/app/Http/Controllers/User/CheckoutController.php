<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Services\User\CheckoutService;
use Illuminate\Http\Request;

class CheckoutController extends Controller
{
    public function processCheckout(Request $request)
    {
        $userId = $request->input('user_id');

        if (!$userId) {
            return $this->responseJSON(null, "User ID is required", 400);
        }

        try {
            $order = CheckoutService::processCheckout($userId);
            return $this->responseJSON($order);
        } catch (\Exception $e) {
            return $this->responseJSON(null, $e->getMessage(), 400);
        }
    }
}
