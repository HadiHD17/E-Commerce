<?php

namespace App\Services\Admin;

use App\Models\ProductImage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use App\Models\Product;

class ProductImageService
{

    static function getAllProductImages($id = null)
    {
        if (!$id) {
            return ProductImage::all();
        }
        return ProductImage::find($id);
    }

    static function getAllImagesByProductId($product_id)
    {
        $product = Product::find($product_id);
        $image = $product->image;

        return $image;
    }

    static function addOrUpdateProductImage($data, $image)
    {

        if (isset($data["base64"]) && isset($data["file_name"]) && isset($data["product_id"])) {
            $base64String = $data["base64"];

            if (Str::contains($base64String, ";base64,")) {
                [$meta, $base64String] = explode(";base64,", $base64String);
            }

            $decoded = base64_decode($base64String);

            $filename = uniqid() . "_" . preg_replace("/\s+/", "_", $data["file_name"]);

            $folder = "product_" . $data["product_id"];
            $fullURL = "product_images/" . $folder . "/" . $filename;

            Storage::disk("public")->put($fullURL, $decoded);

            $image->image_url = $fullURL;
        }

        $image->product_id = $data["product_id"] ?? $image->product_id;

        $image->save();
        return $image;
    }
}
