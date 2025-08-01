<?php

namespace App\Services\User;

use App\Models\Product;

class ProductService
{

    static function getAllProducts($id = null)
    {
        if (!$id) {
            return Product::all();
        }
        return Product::find($id);
    }


    static function getProductsByCategory($category)
    {
        return Product::where("category", $category)->get();
    }

    static function getProductsHighToLow()
    {
        return Product::orderBy('price', 'desc')->get();
    }


    static function getProductsLowToHigh()
    {
        return Product::orderBy('price', 'asc')->get();
    }
}
