<?php

namespace App\Http\Controllers\Common;

use App\Http\Controllers\Controller;
use App\Services\BroadcastingService;
use Illuminate\Http\Request;
use Exception;

class BroadcastingController extends Controller
{
    /**
     * Get user's broadcasting channels
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUserChannels(Request $request)
    {
        try {
            $user = $request->user();
            
            if (!$user) {
                return $this->responseJSON(null, "Unauthorized", 401);
            }

            $channels = BroadcastingService::getUserChannels($user->id, $user->role);
            $broadcastingEnabled = BroadcastingService::isBroadcastingEnabled();

            return $this->responseJSON([
                'channels' => $channels,
                'broadcasting_enabled' => $broadcastingEnabled
            ]);
        } catch (Exception $e) {
            return $this->responseJSON(null, "Failed to get broadcasting channels", 500);
        }
    }

    /**
     * Get broadcasting configuration
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getBroadcastingConfig(Request $request)
    {
        try {
            $config = [
                'driver' => config('broadcasting.default'),
                'enabled' => BroadcastingService::isBroadcastingEnabled(),
                'redis_host' => config('database.redis.default.host'),
                'redis_port' => config('database.redis.default.port'),
            ];

            return $this->responseJSON($config);
        } catch (Exception $e) {
            return $this->responseJSON(null, "Failed to get broadcasting configuration", 500);
        }
    }
} 