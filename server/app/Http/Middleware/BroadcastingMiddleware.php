<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Traits\ResponseTrait;

class BroadcastingMiddleware
{
    use ResponseTrait;

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        // For WebSocket connections, we need to handle authentication differently
        if ($request->is('broadcasting/auth')) {
            $user = Auth::guard('api')->user();
            
            if (!$user) {
                return $this->responseJSON(null, "Unauthorized", 401);
            }

            // Add user info to the request for broadcasting
            $request->merge(['user' => $user]);
        }

        return $next($request);
    }
} 