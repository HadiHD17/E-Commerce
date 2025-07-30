<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Order::factory(10)->create()->each(function ($order) {
            \App\Models\OrderItem::factory(rand(1, 3))->create([
                'order_id' => $order->id,
                'product_id' => \App\Models\Product::inRandomOrder()->first()->id,
            ]);

            \App\Models\Invoice::factory()->create([
                'order_id' => $order->id,
            ]);
        });
    }
}
