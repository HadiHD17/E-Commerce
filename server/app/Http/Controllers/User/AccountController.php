<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Services\User\AccountService;
use Illuminate\Http\Request;
use Exception;

class AccountController extends Controller
{

    public function editAccount(Request $request)
    {
        try {
            $user = AccountService::updateUserProfile($request);
            return $this->responseJSON($user);
        } catch (Exception $e) {
            return $this->responseJSON(null, "Failed to update account");
        }
    }

    public function getUserOrders(Request $request)
    {
        try {
            $status = $request->query('status');
            $orders = AccountService::getUserOrders($status);
            return $this->responseJSON($orders);
        } catch (Exception $e) {
            return $this->responseJSON(null, "Failed to retrieve orders");
        }
    }
} 