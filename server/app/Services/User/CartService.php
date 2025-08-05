<?php

namespace App\Services\User;

use App\Models\CartItem;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartService
{
    static function getCartItems($userId)
    {
        return CartItem::with('product')->where('user_id', $userId)->get();
    }

    static function manageCartItem($data)
    {
        $userId = Auth::id();
        $productId = $data['product_id'];
        $quantity = $data['quantity'] ?? 0;
        $action = $data['action'] ?? 'add'; // 'add', 'update', 'delete'

        // Find existing cart item
        $cartItem = CartItem::where('user_id', $userId)
            ->where('product_id', $productId)
            ->first();

        switch ($action) {
            case 'delete':
                if ($cartItem) {
                    $cartItem->delete();
                    return ['success' => true, 'message' => 'Item deleted', 'data' => null];
                }
                return ['success' => false, 'message' => 'Item not found', 'data' => null];

            case 'update':
                if (!$cartItem) {
                    return ['success' => false, 'message' => 'Item not found', 'data' => null];
                }

                if ($quantity <= 0) {
                    $cartItem->delete();
                    return ['success' => true, 'message' => 'Item deleted (quantity 0)', 'data' => null];
                }

                $cartItem->quantity = $quantity;
                $cartItem->save();
                return ['success' => true, 'message' => 'Item updated', 'data' => $cartItem];

            case 'add':
            default:
                if ($cartItem) {
                    // Update quantity if item exists
                    $cartItem->quantity = $quantity;
                    $cartItem->save();
                    return ['success' => true, 'message' => 'Item updated', 'data' => $cartItem];
                } else {
                    // Create new cart item
                    $newCartItem = CartItem::create($data);
                    return ['success' => true, 'message' => 'Item added', 'data' => $newCartItem];
                }
        }
    }

    static function clearCart($userId)
    {
        return CartItem::where('user_id', $userId)->delete();
    }
}

class UserService
{
    static function getUserById($userId)
    {
        return User::find($userId);
    }
}
