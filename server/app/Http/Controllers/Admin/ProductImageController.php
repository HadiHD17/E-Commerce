<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProductImage;
use App\Services\Admin\ProductImageService;
use App\Services\Admin\ProductService;
use Illuminate\Http\Request;
use Exception;

class ProductImageController extends Controller
{
    public function getAllProductImages($id = null)
    {
        try {
            $image = ProductImageService::getAllProductImages($id);
            return $this->responseJSON($image);
        } catch (Exception $e) {
            return $this->responseJSON(null, "Failed to retrieve image.", 500);
        }
    }

    public function getAllImagesByProductId($product_id)
    {
        try {
            $images = ProductImageService::getAllImagesByProductId($product_id);

            if ($images && count($images) > 0) {
                return $this->responseJSON($images);
            }

            return $this->responseJSON([], "No images found for this product.", 404);
        } catch (Exception $e) {
            return $this->responseJSON(null, "Failed to load product images.", 500);
        }
    }



    public function addOrUpdateProductImage(Request $request, $id = null)
    {
        try {

            $image = new ProductImage();

            if ($id) {
                $image = ProductImageService::getAllProductImages($id);

                if (!$image) {
                    return $this->responseJSON(null, "Image not found", 404);
                }
            }

            $data = $request->all();
            $image = ProductImageService::addOrUpdateProductImage($data, $image);

            if ($image) {
                return $this->responseJSON($image);
            }
            return $this->responseJSON(null, "Failed to save image.", 400);
        } catch (Exception $e) {
            return $this->responseJSON(null, "Server error while saving image.", 500);
        }
    }
}
