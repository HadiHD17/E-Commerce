<?php

use App\Http\Controllers\Common\AuthController;
use App\Http\Controllers\User\ProductController;
use App\Http\Controllers\User\AccountController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Admin\ProductImageController as AdminProductImageControler;
use App\Http\Controllers\Admin\OrderController as AdminOrderController;
use App\Http\Controllers\User\ChatbotController;
use App\Http\Controllers\User\CartController;
use App\Http\Controllers\User\NotificationController;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\Common\FeatureController;
use App\Http\Controllers\Common\WebhookController;
use App\Http\Controllers\User\CheckoutController;
use App\Http\Controllers\Admin\FailedJobsController;
use App\Http\Controllers\Admin\AuditLogController;
use App\Http\Controllers\Common\BroadcastingController;
// use App\Http\Controllers\User\ChatbotController;
// use app\Http\Controllers\User\ChatbotController;
use Illuminate\Support\Facades\Route;


Route::group(["prefix" => "v0.1"], function () {

    Route::group(["middleware" => "auth:api"], function () {
        Route::group(["prefix" => "customer", "middleware" => "rate.limit:60,1"], function () {

            Route::get("products/{id?}", [ProductController::class, "getAllProducts"]);
            Route::get("products_by_category/{category}", [ProductController::class, "getProductsByCategory"]);
            Route::get("products_by_price/{filter}", [ProductController::class, "getProductsByPrice"]);
            Route::get("products_by_search", [ProductController::class, "searchProducts"]);

            // Checkout Routes
            Route::post("checkout", [CheckoutController::class, "processCheckout"]);

            // Account Routes
            Route::put("account/edit", [AccountController::class, "editAccount"]);
            Route::get("account/orders", [AccountController::class, "getUserOrders"]);
            Route::get("user/{id}", [UserController::class, "getUserById"]);

            // Cart Routes
            Route::get("cart_items", [CartController::class, "getCartItems"]);
            Route::post("manage_cart_item", [CartController::class, "manageCartItem"]);
            Route::delete("clear_cart", [CartController::class, "clearCart"]);

            // Notification Routes
            Route::get("notifications", [NotificationController::class, "getNotifications"]);
            Route::get("notifications/unread", [NotificationController::class, "getUnreadNotifications"]);
            Route::post("notifications/mark_as_read", [NotificationController::class, "markAsRead"]);
            Route::post("notifications/mark_all_as_read", [NotificationController::class, "markAllAsRead"]);
        });

        Route::group(["prefix" => "admin", "middleware" => "admin"], function () {

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
            Route::post("cancel_order/{order_id}", [AdminOrderController::class, "cancelOrder"]);

            // Admin Failed Jobs Routes
            Route::get("failed_jobs", [FailedJobsController::class, "getFailedJobs"]);
            Route::post("failed_jobs/retry/{id}", [FailedJobsController::class, "retryFailedJob"]);
            Route::delete("failed_jobs/{id}", [FailedJobsController::class, "deleteFailedJob"]);
            Route::post("failed_jobs/retry_all", [FailedJobsController::class, "retryAllFailedJobs"]);
            Route::delete("failed_jobs/clear_all", [FailedJobsController::class, "clearAllFailedJobs"]);

            // Admin Audit Log Routes
            Route::get("audit_logs", [AuditLogController::class, "getAuditLogs"]);
        });
    });



    // Broadcasting Routes
    Route::group(["prefix" => "broadcasting", "middleware" => "auth:api"], function () {
        Route::get("channels", [BroadcastingController::class, "getUserChannels"]);
        Route::get("config", [BroadcastingController::class, "getBroadcastingConfig"]);
    });

    // Guest Routes (no auth required)
    Route::group(["prefix" => "guest", "middleware" => "rate.limit:30,1"], function () {
        Route::post('register', [AuthController::class, 'register']);
        Route::post('login',    [AuthController::class, 'login']);
        Route::post('forgot_password', [AuthController::class, 'forgotPassword']);
        Route::post('reset_password', [AuthController::class, 'resetPassword']);
    });

    // Public Routes (no auth required)
    Route::group(["prefix" => "common", "middleware" => "rate.limit:60,1"], function () {
        Route::get("categories", [ProductController::class, "getUniqueCategories"]);
        Route::get("featured_products", [FeatureController::class, "getFeaturedProducts"]);
    });

    // Customer Logout Route
    Route::group(["prefix" => "customer", "middleware" => "auth:api"], function () {
        Route::post('logout', [AuthController::class, 'logout']);
    });

    // Webhook Routes (no auth required)
    Route::post('webhook/order', [WebhookController::class, 'handleOrderWebhook'])->middleware('rate.limit:100,1');

    // Chatbot Routes
    Route::group(["prefix" => "chatbot", "middleware" => "auth:api"], function () {
        Route::post('ask', [ChatbotController::class, 'ask'])->middleware('rate.limit:20,1');
    });
});
