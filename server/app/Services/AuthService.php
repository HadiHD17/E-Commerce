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

    /**
     * Send password reset email
     *
     * @param string $email User email
     * @return bool Success status
     */
    public function forgotPassword(string $email): bool
    {
        try {
            $user = User::where('email', $email)->first();
            
            if (!$user) {
                return false;
            }

            $token = \Str::random(60);
            
            \DB::table('password_reset_tokens')->updateOrInsert(
                ['email' => $email],
                [
                    'email' => $email,
                    'token' => Hash::make($token),
                    'created_at' => now()
                ]
            );

            // Here the mail function will be implemented, for now leaving it like this and returning true
            // It will be like that: Mail::to($user->email)->send(new PasswordResetMail($user, $token));
            
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }
    // forgotPassword explanation: generate the password reset token and store it in the db, so the user is authenticated to reset it

    /**
     * Reset password using token
     *
     * @param array $data Reset password data
     * @return bool Success status
     */
    public function resetPassword(array $data): bool
    {
        try {
            $resetToken = \DB::table('password_reset_tokens')
                ->where('email', $data['email'])
                ->first();

            if (!$resetToken) {
                return false;
            }

            $createdAt = \Carbon\Carbon::parse($resetToken->created_at);
            if ($createdAt->diffInMinutes(now()) > 60) {
                \DB::table('password_reset_tokens')->where('email', $data['email'])->delete();
                return false;
            }

            if (!Hash::check($data['token'], $resetToken->token)) {
                return false;
            }

            $user = User::where('email', $data['email'])->first();
            if (!$user) {
                return false;
            }

            $user->password = Hash::make($data['password']);
            $user->save();

            \DB::table('password_reset_tokens')->where('email', $data['email'])->delete();

            return true;
        } catch (\Exception $e) {
            return false;
        }
    }
    // resetPassword explanation: find the reset token, check if it's valid (not expired, it lasts 60 mins), remove it if expired, verify it, update the password, remove the used token

}
