<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthService
{
    /**
     * Register a new user
     *
     * @param array $data User registration data
     * @return array User data with JWT token
     */
    public function register(array $data)
    {
        $user = new User;
        $user->name = $data['name'];
        $user->email = $data['email'];
        $user->password = Hash::make($data['password']);
        $user->role = $data['role'] ?? 'customer';
        $user->phone = $data['phone'] ?? null;
        $user->save();

        $token = JWTAuth::fromUser($user);

        $user->token = $token;
        return $user;
    }

    /**
     * Authenticate user and generate JWT token
     *
     * @param array $credentials User credentials
     * @return array|null User data with JWT token or null if authentication fails
     */
    public function login(array $credentials)
    {
        if (!$token = Auth::guard('api')->attempt($credentials)) {
            return null;
        }

        $user = Auth::guard('api')->user();
        $user->token = $token;

        return $user;
    }

    /**
     * Logout user and invalidate JWT token
     *
     * @return bool
     */
    public function logout(): bool
    {
        Auth::guard('api')->logout();
        return true;
    }
}
