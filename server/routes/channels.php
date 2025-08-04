<?php

use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

// Private channel for customer orders
Broadcast::channel('orders', function ($user) {
    return $user && $user->role === 'customer';
});

// Private channel for admin orders
Broadcast::channel('admin.orders', function ($user) {
    return $user && $user->role === 'admin';
});

// Private channel for user-specific orders
Broadcast::channel('user.{id}.orders', function ($user, $id) {
    return $user && $user->id == $id;
}); 