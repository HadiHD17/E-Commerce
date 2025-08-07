<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\ProductImage;

class ProductImageSeeder extends Seeder
{
    public function run(): void
    {
        $products = Product::all();
        
        foreach ($products as $product) {
            // Add 1-3 images per product
            $imageCount = rand(1, 3);
            
            for ($i = 1; $i <= $imageCount; $i++) {
                ProductImage::create([
                    'product_id' => $product->id,
                    'image_url' => "https://picsum.photos/400/300?random=" . $product->id . $i,
                ]);
            }
        }
        
        $this->command->info('Product images seeded successfully!');
    }
} 