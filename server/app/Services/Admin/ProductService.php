<?php

namespace App\Services\Admin;

use App\Models\Product;
use App\Services\User\ProductService as UserProductService;
use Illuminate\Support\Facades\Cache;

class ProductService
{
    static function getAllProducts($id = null)
    {
        if (!$id) {
            return Product::with('image')->get();
        }
        return Product::with('image')->find($id);
    }

    static function addOrUpdateProduct($data, $product)
    {

        $product->name = $data["name"] ?? $product->name;
        $product->description = $data["description"] ?? $product->description;
        $product->category = $data["category"] ?? $product->category;
        $product->price = $data["price"] ?? $product->price;
        $product->stock = $data["stock"] ?? $product->stock;

        $product->save();
        
        // Clear product cache after update
        UserProductService::clearProductCache();
        
        return $product;
    }

    static function deleteProduct($id)
    {
        $product = Product::with('image')->find($id);

        if (!$product) {
            return null;
        }

        if ($product->delete()) {
            // Clear product cache after deletion
            UserProductService::clearProductCache();
            return true;
        } else {
            return false;
        }
    }
}
