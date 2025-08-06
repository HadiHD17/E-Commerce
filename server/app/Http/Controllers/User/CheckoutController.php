<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Services\User\CheckoutService;
use Illuminate\Http\Request;

class CheckoutController extends Controller
{
    public function processCheckout()
    {
        try {
            $order = CheckoutService::processCheckout();
            return $this->responseJSON($order);
        } catch (\Exception $e) {
            return $this->responseJSON(null, $e->getMessage(), 400);
        }
    }
}
