<?php

namespace App\Services\User;

use App\Models\Notification;
use Illuminate\Support\Facades\Auth;

class NotificationService
{

    public function getUserNotifications()
    {
        $user = Auth::user();
        return Notification::where('user_id', $user->id)
                          ->orderBy('created_at', 'desc')
                          ->get();
    }

    public function markAsRead(int $notificationId)
    {
        $user = Auth::user();
        $notification = Notification::where('id', $notificationId)
                                   ->where('user_id', $user->id)
                                   ->first();

        if (!$notification) {
            return false;
        }

        $notification->is_read = true;
        $notification->save();

        return $notification;
    }

    public function markAllAsRead(): int
    {
        $user = Auth::user();
        return Notification::where('user_id', $user->id)
                          ->where('is_read', false)
                          ->update(['is_read' => true]);
    }

    public function getUnreadNotifications()
    {
        $user = Auth::user();
        return Notification::where('user_id', $user->id)
                          ->where('is_read', false)
                          ->orderBy('created_at', 'desc')
                          ->get();
    }
} 