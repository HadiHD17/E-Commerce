<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /**
     * Test user registration with valid data
     */
    public function test_user_can_register_with_valid_data(): void
    {
        $userData = [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'role' => 'customer'
        ];

        $response = $this->postJson('/api/v0.1/guest/register', $userData);

        $response->assertStatus(200)
                ->assertJsonStructure([
                    'status',
                    'payload' => [
                        'id',
                        'name',
                        'email',
                        'role',
                        'token'
                    ]
                ]);

        $this->assertDatabaseHas('users', [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'role' => 'customer'
        ]);
    }

    /**
     * Test user registration with invalid data
     */
    public function test_user_cannot_register_with_invalid_data(): void
    {
        $userData = [
            'name' => '',
            'email' => 'invalid-email',
            'password' => '123',
            'role' => 'invalid_role'
        ];

        $response = $this->postJson('/api/v0.1/guest/register', $userData);

        $response->assertStatus(422)
                ->assertJsonValidationErrors(['name', 'email', 'password', 'role']);
    }

    /**
     * Test user login with valid credentials
     */
    public function test_user_can_login_with_valid_credentials(): void
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password123'),
            'role' => 'customer'
        ]);

        $credentials = [
            'email' => 'test@example.com',
            'password' => 'password123'
        ];

        $response = $this->postJson('/api/v0.1/guest/login', $credentials);

        $response->assertStatus(200)
                ->assertJsonStructure([
                    'status',
                    'payload' => [
                        'id',
                        'name',
                        'email',
                        'role',
                        'token'
                    ]
                ]);

        $this->assertNotEmpty($response->json('payload.token'));
    }

    /**
     * Test user login with invalid credentials
     */
    public function test_user_cannot_login_with_invalid_credentials(): void
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password123')
        ]);

        $credentials = [
            'email' => 'test@example.com',
            'password' => 'wrongpassword'
        ];

        $response = $this->postJson('/api/v0.1/guest/login', $credentials);

        $response->assertStatus(401)
                ->assertJson([
                    'status' => 'Invalid credentials'
                ]);
    }

    /**
     * Test user logout
     */
    public function test_user_can_logout(): void
    {
        $user = User::factory()->create(['role' => 'customer']);
        $token = JWTAuth::fromUser($user);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token
        ])->postJson('/api/v0.1/customer/logout');

        $response->assertStatus(200)
                ->assertJson([
                    'status' => 'Logged out successfully'
                ]);
    }

    /**
     * Test protected routes require authentication
     */
    public function test_protected_routes_require_authentication(): void
    {
        $response = $this->getJson('/api/v0.1/customer/products');

        $response->assertStatus(401);
    }

    /**
     * Test admin routes require admin role
     */
    public function test_admin_routes_require_admin_role(): void
    {
        $customer = User::factory()->create(['role' => 'customer']);
        $token = JWTAuth::fromUser($customer);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token
        ])->getJson('/api/v0.1/admin/products');

        $response->assertStatus(403);
    }

    /**
     * Test admin can access admin routes
     */
    public function test_admin_can_access_admin_routes(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $token = JWTAuth::fromUser($admin);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token
        ])->getJson('/api/v0.1/admin/products');

        $response->assertStatus(200);
    }

    /**
     * Test JWT token is valid
     */
    public function test_jwt_token_is_valid(): void
    {
        $user = User::factory()->create(['role' => 'customer']);
        $token = JWTAuth::fromUser($user);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token
        ])->getJson('/api/v0.1/customer/products');

        $response->assertStatus(200);
    }

    /**
     * Test password reset functionality
     */
    public function test_user_can_request_password_reset(): void
    {
        $user = User::factory()->create([
            'email' => 'test@example.com'
        ]);

        $response = $this->postJson('/api/v0.1/guest/forgot_password', [
            'email' => 'test@example.com'
        ]);

        $response->assertStatus(200)
                ->assertJson([
                    'status' => 'Password reset link sent to your email'
                ]);
    }

    /**
     * Test rate limiting on auth endpoints
     */
    public function test_rate_limiting_on_auth_endpoints(): void
    {
        for ($i = 0; $i < 65; $i++) {
            $response = $this->postJson('/api/v0.1/guest/login', [
                'email' => 'test@example.com',
                'password' => 'password123'
            ]);
        }

        $response->assertStatus(429);
    }
} 