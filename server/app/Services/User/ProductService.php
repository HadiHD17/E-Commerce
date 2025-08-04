<?php

namespace App\Services\User;

use App\Models\Product;
use Illuminate\Support\Facades\Cache;

class ProductService
{

    static function getAllProducts($id = null)
    {
        if (!$id) {
            return Cache::remember('products.all', 3600, function () {
                return Product::all();
            });
        }
        return Cache::remember("products.{$id}", 3600, function () use ($id) {
            return Product::find($id);
        });
    }


    static function getProductsByCategory($category)
    {
        return Cache::remember("products.category.{$category}", 3600, function () use ($category) {
            return Product::where("category", $category)->get();
        });
    }

    static function getProductsHighToLow()
    {
        return Cache::remember('products.high-to-low', 3600, function () {
            return Product::orderBy('price', 'desc')->get();
        });
    }

    static function getProductsLowToHigh()
    {
        return Cache::remember('products.low-to-high', 3600, function () {
            return Product::orderBy('price', 'asc')->get();
        });
    }

    static function searchProducts($searchTerm)
    {
        return Cache::remember("products.search.{$searchTerm}", 1800, function () use ($searchTerm) {
            return Product::where('name', 'like', '%' . $searchTerm . '%')
                ->get();
        });
    }

    static function clearProductCache()
    {
        Cache::forget('products.all');
        Cache::forget('products.high-to-low');
        Cache::forget('products.low-to-high');
        
        // Clear category caches
        $categories = Product::distinct()->pluck('category');
        foreach ($categories as $category) {
            Cache::forget("products.category.{$category}");
        }
    }
}
