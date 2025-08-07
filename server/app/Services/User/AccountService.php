<?php

namespace App\Services\User;

use App\Models\User;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AccountService
{

    static function updateUserProfile(Request $request)
    {
        $authUser = Auth::user();
        $user = User::find($authUser->id);


        // Check if password change is requested
        $wantsPasswordChange = $request->filled('current_password') ||
            $request->filled('new_password') ||
            $request->filled('new_password_confirmation');

        // Validation rules
        $rules = [
            'name'  => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $user->id,
            'phone' => 'sometimes|string|max:20',
        ];

        if ($wantsPasswordChange) {
            $rules = array_merge($rules, [
                'current_password'          => 'required|string',
                'new_password'              => 'required|string|min:6|confirmed',
                // 'confirmed' expects new_password_confirmation
            ]);
        }

        $validatedData = $request->validate($rules);

        // Hash password if provided
        if ($wantsPasswordChange) {
            if (!Hash::check($validatedData['current_password'], $user->password)) {
                return response()->json([
                    'message' => 'Current password is incorrect.',
                ], 422);
            }
            $validatedData['password'] = Hash::make($validatedData['new_password']);
            unset($validatedData['current_password'], $validatedData['new_password'], $validatedData['new_password_confirmation']);
        }

        $user->update($validatedData);

        return $user->fresh();
    }

    static function getUserOrders($status = null)
    {
        $user = Auth::user();

        $query = Order::where('user_id', $user->id)
            ->with(['orderItems.product.image']);

        if ($status) {
            $query->where('status', $status);
        }

        return $query->orderBy('created_at', 'desc')->get();
    }
}
