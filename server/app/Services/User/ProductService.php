<?php

namespace App\Services\User;

use App\Models\Product;

class ProductService
{

    static function getAllProducts($id = null){
        if(!$id){
            return Product::all();
        }
        return Product::find($id);
    }

    
}
