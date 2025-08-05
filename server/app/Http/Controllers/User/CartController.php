<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\CartItem;
use App\Services\User\CartService;
use App\Services\User\UserService;
use Illuminate\Http\Request;
use Exception;

class CartController extends Controller
{
    public function getCartItems(Request $request)
    {
        try {
            $userId = auth()->id();
            $cartItems = CartService::getCartItems($userId);
            return $this->responseJSON($cartItems);
        } catch (Exception $e) {
            return $this->responseJSON(null, "Failed to retrieve cart items");
        }
    }

    public function manageCartItem(Request $request)
    {
        try {
            $data = $request->validate([
                'product_id' => 'required|integer|exists:products,id',
                'quantity' => 'required|integer|min:0',
                'action' => 'sometimes|string|in:add,update,delete',
            ]);

            $data['user_id'] = auth()->id();
            $data['action'] = $data['action'] ?? 'add';
            
            $result = CartService::manageCartItem($data);
            
            if ($result['success']) {
                return $this->responseJSON($result['data'], $result['message']);
            } else {
                return $this->responseJSON(null, $result['message'], 404);
            }
        } catch (Exception $e) {
            return $this->responseJSON(null, "Failed to manage cart item");
        }
    }

    public function clearCart()
    {
        try {
            $userId = auth()->id();
            $deleted = CartService::clearCart($userId);
            
            return $this->responseJSON(null, "Cart cleared successfully");
        } catch (Exception $e) {
            return $this->responseJSON(null, "Failed to clear cart");
        }
    }
}
