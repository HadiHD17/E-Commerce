<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Services\User\UserService;
use Illuminate\Http\Request;
use Exception;

class UserController extends Controller
{
    public function getUserById($userId)
    {
        try {
            $user = UserService::getUserById($userId);
            
            if (!$user) {
                return $this->responseJSON(null, "User not found", 404);
            }
            
            return $this->responseJSON($user);
        } catch (Exception $e) {
            return $this->responseJSON(null, "Failed to retrieve user");
        }
    }
} 