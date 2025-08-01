<?php

namespace App\Services\User;

use App\Models\CartItem;
use Illuminate\Http\Request;

class CartService
{
    static function getCartItems(Request $request)
    {
        $userId = $request->input('user_id');

        $cartItems = CartItem::where('user_id', $userId)->get();

        return $cartItems;
    }
    static function addToCart($data, $cartItem)
    {
        if ($cartItem->exists) {
            $cartItem->increment('quantity', $data['quantity']);
        }
        $cartItem->user_id = $data['user_id'] ?? $cartItem->user_id;
        $cartItem->product_id = $data['product_id'] ?? $cartItem->product_id;
        $cartItem->quantity = $data['quantity'] ?? $cartItem->quantity;
        $cartItem->save();
        return $cartItem;
    }
}
