<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Traits\ResponseTrait;

class AdminMiddleware
{
    use ResponseTrait;

    public function handle(Request $request, Closure $next)
    {
        $user = $request->user();

        if (!$user) {
            return $this->responseJSON(null, "Unauthorized", 401);
        }

        if ($user->role !== 'admin') {
            return $this->responseJSON(null, "Access denied. Admin role required.", 403);
        }

        return $next($request);
    }
} 