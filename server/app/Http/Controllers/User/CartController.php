<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\CartItem;
use App\Services\User\CartService;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function getCartItems(Request $request)
    {
        $cartItems = CartService::getCartItems($request);
        return $this->responseJSON($cartItems);
    }

    public function addToCart(Request $request)
    {
        $data = $request->validate([
            'user_id' => 'required|integer',
            'product_id' => 'required|integer',
            'quantity' => 'required|integer|min:1',
        ]);

        $cartItem = new CartItem();
        $cartItem = CartService::addToCart($data, $cartItem);
        return $this->responseJSON($cartItem);
    }
}
