<?php

namespace App\Services\User;

use App\Models\CartItem;

class CartService
{
    static function getCartItems($id = null)
    {
        if (!$id) {
            return CartItem::all();
        }
        return CartItem::find($id);
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
