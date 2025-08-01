<?php

namespace App\Http\Controllers\Common;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\AuthService;
use App\Traits\ResponseTrait;
use Exception;

class AuthController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function register(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'phone' => 'nullable|string',
            'role' => 'in:admin,customer'
        ]);

        $result = $this->authService->register($data);
        return ResponseTrait::responseJSON($result, 'Registered successfully', 200);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        $result = $this->authService->login($credentials);

        if (!$result) {
            return ResponseTrait::responseJSON(null, 'Invalid credentials', 401);
        }

        return ResponseTrait::responseJSON($result, 'Login successful');
    }

    public function logout()
    {
        $this->authService->logout();
        return ResponseTrait::responseJSON(null, 'Logged out successfully');
    }

    public function forgotPassword(Request $request)
    {
        try {
            $data = $request->validate([
                'email' => 'required|email|exists:users,email',
            ]);

            $result = $this->authService->forgotPassword($data['email']);
            return $this->responseJSON($result);
        } catch (Exception $e) {
            return $this->responseJSON(null, "Failed to send reset email");
        }
    }

    public function resetPassword(Request $request)
    {
        try {
            $data = $request->validate([
                'email' => 'required|email',
                'token' => 'required|string',
                'password' => 'required|string|min:6|confirmed',
            ]);

            $result = $this->authService->resetPassword($data);
            return $this->responseJSON($result);
        } catch (Exception $e) {
            return $this->responseJSON(null, "Failed to reset password");
        }
    }
}
