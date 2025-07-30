<?php

use App\Http\Controllers\Common\AuthController;
use App\Http\Controllers\User\ProductController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;
use Illuminate\Support\Facades\Route;


Route::group(["prefix" => "v0.1"], function () {

    Route::group(["middleware" => "auth:api"], function () {
        Route::group(["prefix" => "customer"], function () {

            Route::get("products/{id?}", [ProductController::class, "getAllProducts"]);

        });

        Route::group(["prefix" => "admin"], function () {
            
            Route::get("products/{id?}", [AdminProductController::class, "getAllProducts"]);
            Route::post("add_update_product/{id?}", [AdminProductController::class, "addOrUpdateProduct"]);
            Route::get("delete_product/{id}", [AdminProductController::class, "deleteProduct"]);
            
        });
    });
    
    Route::group(["prefix" => "guest"], function () {
        Route::post('register', [AuthController::class, 'register']);
        Route::post('login',    [AuthController::class, 'login']);
    });


    Route::middleware('auth:api')->post('logout', [AuthController::class, 'logout']);
});
