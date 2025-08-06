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
            return \Cache::remember('admin.products.all', 3600, function () {
                return Product::with('image')->get();
            });
        }
        return \Cache::remember("admin.products.{$id}", 3600, function () use ($id) {
            return Product::with('image')->find($id);
        });
    }

    static function addOrUpdateProduct($data, $product)
    {
        try {
            if (empty($data['name']) || empty($data['price']) || !isset($data['stock'])) {
                return null;
            }

            $product->name = $data['name'];
            $product->description = $data['description'] ?? null;
            $product->price = $data['price'];
            $product->stock = $data['stock'];
            $product->category = $data['category'] ?? null;
            $product->save();

            self::clearProductCache();

            return $product->load('image');
        } catch (\Exception $e) {
            return null;
        }
    }

    static function deleteProduct($id)
    {
        try {
            $product = Product::find($id);
            
            if (!$product) {
                return false;
            }

            $product->delete();

            self::clearProductCache();

            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

    static function getProductsByCategory($category)
    {
        return \Cache::remember("admin.products.category.{$category}", 3600, function () use ($category) {
            return Product::with('image')->where('category', $category)->get();
        });
    }

    static function getProductsHighToLow()
    {
        return \Cache::remember('admin.products.high-to-low', 3600, function () {
            return Product::with('image')->orderBy('price', 'desc')->get();
        });
    }

    static function getProductsLowToHigh()
    {
        return \Cache::remember('admin.products.low-to-high', 3600, function () {
            return Product::with('image')->orderBy('price', 'asc')->get();
        });
    }

    static function searchProducts($searchTerm)
    {
        return \Cache::remember("admin.products.search.{$searchTerm}", 1800, function () use ($searchTerm) {
            return Product::with('image')->where('name', 'like', '%' . $searchTerm . '%')->get();
        });
    }

    static function getUniqueCategories()
    {
        return \Cache::remember('admin.products.categories', 3600, function () {
            return Product::distinct()->whereNotNull('category')->pluck('category');
        });
    }

    static function clearProductCache()
    {
        \Cache::forget('admin.products.all');
        \Cache::forget('admin.products.high-to-low');
        \Cache::forget('admin.products.low-to-high');
        \Cache::forget('admin.products.categories');
        // Clear category caches
        $categories = Product::distinct()->pluck('category');
        foreach ($categories as $category) {
            \Cache::forget("admin.products.category.{$category}");
        }
    }
}
