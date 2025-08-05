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

        $validatedData = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $user->id,
            'phone' => 'sometimes|string|max:20',
            'password' => 'sometimes|string|min:6',
        ]);

        // Hash password if provided
        if (isset($validatedData['password'])) {
            $validatedData['password'] = Hash::make($validatedData['password']);
        }

        $user->update($validatedData);

        return $user->fresh();
    }

    static function getUserOrders($status = null)
    {
        $user = Auth::user();

        $query = Order::where('user_id', $user->id)
            ->with(['orderItems.product']);

        if ($status) {
            $query->where('status', $status);
        }

        return $query->orderBy('created_at', 'desc')->get();
    }
}
