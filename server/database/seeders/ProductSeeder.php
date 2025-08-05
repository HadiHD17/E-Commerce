<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create products with specific categories for testing
        $categories = ['TV', 'Laptop', 'Mouse', 'Keyboard', 'Headphones', 'Monitor', 'Tablet', 'Smartphone'];
        
        foreach ($categories as $category) {
            // Create 2-4 products for each category
            $count = rand(2, 4);
            \App\Models\Product::factory($count)->create(['category' => $category]);
        }
        
        // Create some products without category (should be excluded)
        \App\Models\Product::factory(3)->create(['category' => null]);
    }
}
