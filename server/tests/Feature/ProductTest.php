<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Cache;
use Tymon\JWTAuth\Facades\JWTAuth;

class ProductTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected $admin;
    protected $customer;
    protected $adminToken;
    protected $customerToken;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Create admin user
        $this->admin = User::factory()->create(['role' => 'admin']);
        $this->adminToken = JWTAuth::fromUser($this->admin);
        
        // Create customer user
        $this->customer = User::factory()->create(['role' => 'customer']);
        $this->customerToken = JWTAuth::fromUser($this->customer);
    }

    /**
     * Test customer can view all products
     */
    public function test_customer_can_view_all_products(): void
    {
        Product::factory()->count(5)->create();

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->customerToken
        ])->getJson('/api/v0.1/customer/products');

        $response->assertStatus(200)
                ->assertJsonStructure([
                    'data' => [
                        '*' => [
                            'id',
                            'name',
                            'description',
                            'category',
                            'price',
                            'stock',
                            'image'
                        ]
                    ]
                ]);

        $this->assertCount(5, $response->json('data'));
    }

    /**
     * Test customer can search products
     */
    public function test_customer_can_search_products(): void
    {
        Product::factory()->create(['name' => 'iPhone 15']);
        Product::factory()->create(['name' => 'Samsung Galaxy']);
        Product::factory()->create(['name' => 'MacBook Pro']);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->customerToken
        ])->getJson('/api/v0.1/customer/products_by_search?q=iPhone');

        $response->assertStatus(200);
        $this->assertCount(1, $response->json('data'));
        $this->assertEquals('iPhone 15', $response->json('data.0.name'));
    }

    /**
     * Test customer can filter products by category
     */
    public function test_customer_can_filter_products_by_category(): void
    {
        Product::factory()->create(['category' => 'Electronics']);
        Product::factory()->create(['category' => 'Books']);
        Product::factory()->create(['category' => 'Electronics']);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->customerToken
        ])->getJson('/api/v0.1/customer/products_by_category/Electronics');

        $response->assertStatus(200);
        $this->assertCount(2, $response->json('data'));
    }

    /**
     * Test customer can filter products by price
     */
    public function test_customer_can_filter_products_by_price(): void
    {
        Product::factory()->create(['price' => 50.00]);
        Product::factory()->create(['price' => 150.00]);
        Product::factory()->create(['price' => 250.00]);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->customerToken
        ])->getJson('/api/v0.1/customer/products_by_price/high_to_low');

        $response->assertStatus(200);
        $data = $response->json('data');
        $this->assertGreaterThan($data[1]['price'], $data[0]['price']);
    }

    /**
     * Test admin can create a product
     */
    public function test_admin_can_create_product(): void
    {
        $productData = [
            'name' => 'Test Product',
            'description' => 'Test Description',
            'category' => 'Electronics',
            'price' => 99.99,
            'stock' => 50
        ];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->adminToken
        ])->postJson('/api/v0.1/admin/products', $productData);

        $response->assertStatus(200)
                ->assertJsonStructure([
                    'data' => [
                        'id',
                        'name',
                        'description',
                        'category',
                        'price',
                        'stock'
                    ]
                ]);

        $this->assertDatabaseHas('products', $productData);
    }

    /**
     * Test admin can update a product
     */
    public function test_admin_can_update_product(): void
    {
        $product = Product::factory()->create();
        
        $updateData = [
            'name' => 'Updated Product',
            'price' => 199.99,
            'stock' => 25
        ];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->adminToken
        ])->putJson("/api/v0.1/admin/products/{$product->id}", $updateData);

        $response->assertStatus(200);
        $this->assertDatabaseHas('products', $updateData);
    }

    /**
     * Test admin can delete a product
     */
    public function test_admin_can_delete_product(): void
    {
        $product = Product::factory()->create();

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->adminToken
        ])->deleteJson("/api/v0.1/admin/products/{$product->id}");

        $response->assertStatus(200);
        $this->assertDatabaseMissing('products', ['id' => $product->id]);
    }

    /**
     * Test customer cannot access admin product routes
     */
    public function test_customer_cannot_access_admin_product_routes(): void
    {
        $productData = [
            'name' => 'Test Product',
            'description' => 'Test Description',
            'category' => 'Electronics',
            'price' => 99.99,
            'stock' => 50
        ];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->customerToken
        ])->postJson('/api/v0.1/admin/products', $productData);

        $response->assertStatus(403);
    }

    /**
     * Test product caching works
     */
    public function test_product_caching_works(): void
    {
        Product::factory()->count(3)->create();

        // First request - should cache
        $response1 = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->customerToken
        ])->getJson('/api/v0.1/customer/products');

        $response1->assertStatus(200);

        // Second request - should use cache
        $response2 = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->customerToken
        ])->getJson('/api/v0.1/customer/products');

        $response2->assertStatus(200);
        
        // Both responses should be identical
        $this->assertEquals($response1->json(), $response2->json());
    }

    /**
     * Test product images are loaded
     */
    public function test_product_images_are_loaded(): void
    {
        $product = Product::factory()->create();
        ProductImage::factory()->create([
            'product_id' => $product->id,
            'image_url' => 'https://example.com/image.jpg'
        ]);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->customerToken
        ])->getJson("/api/v0.1/customer/products/{$product->id}");

        $response->assertStatus(200)
                ->assertJsonStructure([
                    'data' => [
                        'id',
                        'name',
                        'image' => [
                            '*' => [
                                'id',
                                'product_id',
                                'image_url'
                            ]
                        ]
                    ]
                ]);

        $this->assertCount(1, $response->json('data.image'));
    }

    /**
     * Test product validation
     */
    public function test_product_validation(): void
    {
        $invalidData = [
            'name' => '',
            'price' => 'invalid_price',
            'stock' => -5
        ];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->adminToken
        ])->postJson('/api/v0.1/admin/products', $invalidData);

        $response->assertStatus(422)
                ->assertJsonValidationErrors(['name', 'price', 'stock']);
    }

    /**
     * Test product not found
     */
    public function test_product_not_found(): void
    {
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->customerToken
        ])->getJson('/api/v0.1/customer/products/999');

        $response->assertStatus(404);
    }
} 