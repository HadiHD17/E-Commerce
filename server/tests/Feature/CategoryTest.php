<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;

class CategoryTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /**
     * Test getting unique categories
     */
    public function test_can_get_unique_categories(): void
    {
        // Create products with different categories
        Product::factory()->create(['category' => 'TV']);
        Product::factory()->create(['category' => 'TV']);
        Product::factory()->create(['category' => 'Laptop']);
        Product::factory()->create(['category' => 'Laptop']);
        Product::factory()->create(['category' => 'Mouse']);
        Product::factory()->create(['category' => null]); // Should be excluded

        $response = $this->getJson('/api/v0.1/common/categories');

        $response->assertStatus(200)
                ->assertJsonStructure([
                    'status',
                    'payload'
                ]);

        $categories = $response->json('payload');
        
        // Should return unique categories only
        $this->assertCount(3, $categories);
        $this->assertContains('TV', $categories);
        $this->assertContains('Laptop', $categories);
        $this->assertContains('Mouse', $categories);
    }

    /**
     * Test categories endpoint returns empty array when no products exist
     */
    public function test_returns_empty_array_when_no_products(): void
    {
        $response = $this->getJson('/api/v0.1/common/categories');

        $response->assertStatus(200)
                ->assertJson([
                    'status' => 'success',
                    'payload' => []
                ]);
    }
} 