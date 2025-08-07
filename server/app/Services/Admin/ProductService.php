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
            return Cache::remember('admin.products.all', 3600, function () {
                return Product::with('image')->get();
            });
        }
        return Cache::remember("admin.products.{$id}", 3600, function () use ($id) {
            return Product::with('image')->find($id);
        });
    }

    static function addOrUpdateProduct($data, $product)
    {
        try {
            $isNew = !$product->exists; // Check if this is a new product

            if ($isNew) {
                // Require all required fields for creation
                if (empty($data['name']) || empty($data['price']) || !isset($data['stock'])) {
                    throw new \Exception('Missing required fields: name, price, or stock for new product');
                }
            }

            // Only update fields if they are provided
            if (isset($data['name'])) {
                $product->name = $data['name'];
            }
            if (isset($data['description'])) {
                $product->description = $data['description'];
            }
            if (isset($data['price'])) {
                $product->price = $data['price'];
            }
            if (isset($data['stock'])) {
                $product->stock = $data['stock'];
            }
            if (isset($data['category'])) {
                $product->category = $data['category'];
            }

            if (!$product->save()) {
                throw new \Exception('Save failed');
            }

            // Optional: load relations
            return $product->load('image');
        } catch (\Exception $e) {
            return ['__error' => $e->getMessage()];
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
