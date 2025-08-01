<?php

use App\Http\Controllers\Common\AuthController;
use App\Http\Controllers\User\ProductController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Admin\ProductImageController as AdminProductImageControler;
use App\Http\Controllers\Admin\OrderController as AdminOrderController;
use App\Http\Controllers\User\CartController;
use App\Http\Controllers\Common\FeatureController;
use Illuminate\Support\Facades\Route;


Route::group(["prefix" => "v0.1"], function () {

    Route::group(["middleware" => "auth:api"], function () {
        Route::group(["prefix" => "customer"], function () {

            Route::get("products/{id?}", [ProductController::class, "getAllProducts"]);
            Route::get("products_by_category/{category}", [ProductController::class, "getProductsByCategory"]);
            Route::get("products_by_price/{filter}", [ProductController::class, "getProductsByPrice"]);
            Route::get("products_by_search/{search}", [ProductController::class, "getProductsBySearch"]);
            Route::get("cart_items", [CartController::class, "getCartItems"]);
            Route::post("add_to_cart", [CartController::class, "addToCart"]);
        });

        Route::group(["prefix" => "common"], function () {
            Route::get("featured_products", [FeatureController::class, "getFeaturedProducts"]);
        });

        Route::group(["prefix" => "admin"], function () {

            Route::get("products/{id?}", [AdminProductController::class, "getAllProducts"]);
            Route::post("add_update_product/{id?}", [AdminProductController::class, "addOrUpdateProduct"]);
            Route::get("delete_product/{id}", [AdminProductController::class, "deleteProduct"]);
            Route::get("product_images/{id?}", [AdminProductImageControler::class, "getAllProductImages"]);
            Route::get("product_images_by_product_id/{product_id}", [AdminProductImageControler::class, "getAllImagesByProductId"]);
            Route::post("add_update_product_image/{id?}", [AdminProductImageControler::class, "addOrUpdateProductImage"]);

            // Admin Order Routes
            Route::get("todays_orders", [AdminOrderController::class, "getTodaysOrders"]);
            Route::get("todays_revenue", [AdminOrderController::class, "getTodaysRevenue"]);
            Route::get("revenue", [AdminOrderController::class, "getRevenue"]);
            Route::post("set_order_status/{order_id}", [AdminOrderController::class, "setOrderStatus"]);
        });
    });

    Route::group(["prefix" => "guest"], function () {
        Route::post('register', [AuthController::class, 'register']);
        Route::post('login',    [AuthController::class, 'login']);
    });


    Route::middleware('auth:api')->post('logout', [AuthController::class, 'logout']);
});
