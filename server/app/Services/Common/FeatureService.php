<?php

namespace App\Services\Common;

use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Support\Facades\DB;

class FeatureService
{
    static function getFeaturedProducts($limit = 5)
    {
        $topProductIds = OrderItem::select('product_id', DB::raw('SUM(quantity) as total_quantity'))
            ->groupBy('product_id')
            ->orderBy('total_quantity', 'desc')
            ->take($limit)
            ->pluck('product_id');

        return Product::with('image')->whereIn('id', $topProductIds)
            ->orderByRaw('FIELD(id, ' . $topProductIds->implode(',') . ')')
            ->get();
    }
}
