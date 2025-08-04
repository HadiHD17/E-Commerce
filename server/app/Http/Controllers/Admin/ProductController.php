<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Services\Admin\ProductService;
use App\Services\Admin\AuditLogService;
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
            $isUpdate = false;
            $oldData = null;

            if ($id) {
                $product = ProductService::getAllProducts($id);
                $isUpdate = true;
                $oldData = $product ? $product->toArray() : null;

                if (!$product) {
                    return $this->responseJSON(null, "Product not found", 404);
                }
            }

            $data = $request->all();
            $product = ProductService::addOrUpdateProduct($data, $product);

            if ($product) {
                // Log the audit action
                $action = $isUpdate ? 'product_updated' : 'product_created';
                AuditLogService::logAction(
                    auth()->id(),
                    $action,
                    'Product',
                    $product->id,
                    $oldData ? 'old' : 'new',
                    'updated'
                );

                return $this->responseJSON($product);
            }

            return $this->responseJSON(null, "Failed to save product", 400);
        } catch (Exception $e) {
            return $this->responseJSON(null, "Server error while saving product", 500);
        }
    }

    public function deleteProduct($id)
    {
        try {
            if ($id) {
                $product = Product::find($id);
                $oldData = $product ? $product->toArray() : null;

                $deleted = ProductService::deleteProduct($id);

                if ($deleted) {
                                    // Log the audit action
                AuditLogService::logAction(
                    auth()->id(),
                    'product_deleted',
                    'Product',
                    $id,
                    'active',
                    'deleted'
                );

                    return $this->responseJSON(null);
                } else {
                    return $this->responseJSON(null, "Product not found", 400);
                }
            } else {
                return $this->responseJSON(null, "Product id is required", 400);
            }
        } catch (Exception $e) {
            return $this->responseJSON(null, "Server error while deleting product", 500);
        }
    }
}
