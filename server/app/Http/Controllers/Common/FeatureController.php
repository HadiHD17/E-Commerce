<?php

namespace App\Http\Controllers\Common;

use App\Http\Controllers\Controller;
use App\Services\Common\FeatureService;
use Exception;
use Illuminate\Http\Request;

class FeatureController extends Controller
{
    public function getFeaturedProducts()
    {
        try {
            $Featuredproducts = FeatureService::getFeaturedProducts();
            return $this->responseJSON($Featuredproducts);
        } catch (Exception $e) {
            return $this->responseJSON(null, "Failed to retrieve featured products", 500);
        }
    }
}
