<?php

namespace App\Services\Admin;

use App\Models\Product;

class ProductService
{
    static function getAllProducts($id = null){
        if(!$id){
            return Product::all();
        }
        return Product::find($id);
    }

    static function addOrUpdateProduct($data, $product){

        $product->name = $data["name"] ?? $product->name;
        $product->description = $data["description"] ?? $product->description;
        $product->category = $data["category"] ?? $product->category;
        $product->price = $data["price"] ?? $product->price;
        $product->stock = $data["stock"] ?? $product->stock;

        $product->save();
        return $product;

    }
}
