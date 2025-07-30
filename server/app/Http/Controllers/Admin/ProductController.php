<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Services\Admin\ProductService;
use Illuminate\Http\Request;
use Exception;

class ProductController extends Controller
{
    public function getAllProducts($id = null)
    {
        try {
            $products = ProductService::getAllProducts($id);
            return $this->responseJSON($products);
        } catch (Exception $e) {
            return $this->responseJSON(null, "Failed to retreive products");
        }
    }

    public function addOrUpdateProduct(Request $request, $id = null)
    {
        try {
            $product = new Product();

            if ($id) {
                $product = ProductService::getAllProducts($id);

                if (!$product) {
                    return $this->responseJSON(null, "Product not found", 404);
                }
            }

            $data = $request->all();
            $product = ProductService::addOrUpdateProduct($data, $product);

            if($product){
                return $this->responseJSON($product);
            }

            return $this->responseJSON(null, "Failed to save product", 400);

        } catch (Exception $e) {
            return $this->responseJSON(null, "erver error while saving product", 500);
        }
    }
}
