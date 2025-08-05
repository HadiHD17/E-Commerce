<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Services\AuthService;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthServiceTest extends TestCase
{
    use RefreshDatabase;

    protected $authService;

    protected function setUp(): void
    {
        parent::setUp();
        $this->authService = new AuthService();
    }

    /**
     * Test user registration with valid data
     */
    public function test_register_creates_user_with_valid_data(): void
    {
        $userData = [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => 'password123',
            'role' => 'customer'
        ];

        $result = $this->authService->register($userData);

        $this->assertInstanceOf(User::class, $result);
        $this->assertEquals('John Doe', $result->name);
        $this->assertEquals('john@example.com', $result->email);
        $this->assertEquals('customer', $result->role);
        $this->assertNotEmpty($result->token);

        $this->assertDatabaseHas('users', [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'role' => 'customer'
        ]);
    }

    /**
     * Test user registration with default role
     */
    public function test_register_uses_default_role_when_not_provided(): void
    {
        $userData = [
            'name' => 'Jane Doe',
            'email' => 'jane@example.com',
            'password' => 'password123'
        ];

        $result = $this->authService->register($userData);

        $this->assertEquals('customer', $result->role);
    }

    /**
     * Test login with valid credentials
     */
    public function test_login_with_valid_credentials_returns_user(): void
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => Hash::make('password123')
        ]);

        $credentials = [
            'email' => 'test@example.com',
            'password' => 'password123'
        ];

        $result = $this->authService->login($credentials);

        $this->assertInstanceOf(User::class, $result);
        $this->assertEquals($user->id, $result->id);
        $this->assertNotEmpty($result->token);
    }

    /**
     * Test login with invalid credentials
     */
    public function test_login_with_invalid_credentials_returns_null(): void
    {
        User::factory()->create([
            'email' => 'test@example.com',
            'password' => Hash::make('password123')
        ]);

        $credentials = [
            'email' => 'test@example.com',
            'password' => 'wrongpassword'
        ];

        $result = $this->authService->login($credentials);

        $this->assertNull($result);
    }

    /**
     * Test login with non-existent user
     */
    public function test_login_with_nonexistent_user_returns_null(): void
    {
        $credentials = [
            'email' => 'nonexistent@example.com',
            'password' => 'password123'
        ];

        $result = $this->authService->login($credentials);

        $this->assertNull($result);
    }

    /**
     * Test logout functionality
     */
    public function test_logout_returns_true(): void
    {
        $result = $this->authService->logout();

        $this->assertTrue($result);
    }

    /**
     * Test password reset token creation
     */
    public function test_forgot_password_creates_reset_token(): void
    {
        $user = User::factory()->create([
            'email' => 'test@example.com'
        ]);

        $data = ['email' => 'test@example.com'];

        $result = $this->authService->forgotPassword($data);

        $this->assertTrue($result);

        $this->assertDatabaseHas('password_reset_tokens', [
            'email' => 'test@example.com'
        ]);
    }

    /**
     * Test password reset with valid token
     */
    public function test_reset_password_with_valid_token(): void
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => Hash::make('oldpassword')
        ]);

        // Create reset token
        $token = \Str::random(60);
        \DB::table('password_reset_tokens')->insert([
            'email' => 'test@example.com',
            'token' => Hash::make($token),
            'created_at' => now()
        ]);

        $data = [
            'email' => 'test@example.com',
            'token' => $token,
            'password' => 'newpassword123'
        ];

        $result = $this->authService->resetPassword($data);

        $this->assertTrue($result);

        // Verify password was changed
        $user->refresh();
        $this->assertTrue(Hash::check('newpassword123', $user->password));
    }

    /**
     * Test password reset with invalid token
     */
    public function test_reset_password_with_invalid_token(): void
    {
        $user = User::factory()->create([
            'email' => 'test@example.com'
        ]);

        $data = [
            'email' => 'test@example.com',
            'token' => 'invalid_token',
            'password' => 'newpassword123'
        ];

        $result = $this->authService->resetPassword($data);

        $this->assertFalse($result);
    }

    /**
     * Test password reset with expired token
     */
    public function test_reset_password_with_expired_token(): void
    {
        $user = User::factory()->create([
            'email' => 'test@example.com'
        ]);

        $token = \Str::random(60);
        \DB::table('password_reset_tokens')->insert([
            'email' => 'test@example.com',
            'token' => Hash::make($token),
            'created_at' => now()->subHours(2) // 2 hours ago (expired)
        ]);

        $data = [
            'email' => 'test@example.com',
            'token' => $token,
            'password' => 'newpassword123'
        ];

        $result = $this->authService->resetPassword($data);

        $this->assertFalse($result);
    }

    /**
     * Test JWT token generation
     */
    public function test_jwt_token_generation(): void
    {
        $user = User::factory()->create();

        $token = JWTAuth::fromUser($user);

        $this->assertNotEmpty($token);
        $this->assertIsString($token);

        // Verify token can be decoded
        $decoded = JWTAuth::setToken($token)->getPayload();
        $this->assertEquals($user->id, $decoded->get('sub'));
    }
} 