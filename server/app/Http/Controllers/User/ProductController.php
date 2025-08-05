<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Services\User\ProductService;
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

    public function getProductsByCategory($category)
    {
        try {
            $products = ProductService::getProductsByCategory($category);
            return $this->responseJSON($products);
        } catch (Exception $e) {
            return $this->responseJSON(null, "Failed to retreive products");
        }
    }

    public function getProductsByPrice($filter)
    {
        try {
            if ($filter == "high-to-low") {
                $products = ProductService::getProductsHighToLow();
                return $this->responseJSON($products);
            }
            $products = ProductService::getProductsLowToHigh();
            return $this->responseJSON($products);
        } catch (Exception $e) {
            return $this->responseJSON(null, "Failed to retreive products");
        }
    }

    public function searchProducts(Request $request)
    {
        $searchTerm = $request->input('searchTerm');
        if (!$searchTerm) {
            return $this->responseJSON(null, "Search term is required", 400);
        }

        try {
            $products = ProductService::searchProducts($searchTerm);
            return $this->responseJSON($products);
        } catch (Exception $e) {
            return $this->responseJSON(null, "Failed to retreive products", 400);
        }
    }

    public function getUniqueCategories()
    {
        try {
            $categories = ProductService::getUniqueCategories();
            return $this->responseJSON($categories);
        } catch (Exception $e) {
            return $this->responseJSON(null, "Failed to retrieve categories");
        }
    }
}
