<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Services\User\NotificationService;
use Illuminate\Http\Request;
use Exception;

class NotificationController extends Controller
{
    protected $notificationService;

    public function __construct(NotificationService $notificationService)
    {
        $this->notificationService = $notificationService;
    }

    public function getNotifications(Request $request)
    {
        try {
            $notifications = $this->notificationService->getUserNotifications();
            return $this->responseJSON($notifications);
        } catch (Exception $e) {
            return $this->responseJSON(null, "Failed to retrieve notifications");
        }
    }

    public function markAsRead(Request $request)
    {
        try {
            $data = $request->validate([
                'notification_id' => 'required|integer|exists:notifications,id'
            ]);

            $result = $this->notificationService->markAsRead($data['notification_id']);
            return $this->responseJSON($result);
        } catch (Exception $e) {
            return $this->responseJSON(null, $e->getMessage());
        }
    }

    public function markAllAsRead()
    {
        try {
            $result = $this->notificationService->markAllAsRead();
            return $this->responseJSON($result);
        } catch (Exception $e) {
            return $this->responseJSON(null, "Failed to mark all notifications as read");
        }
    }

    public function getUnreadNotifications()
    {
        try {
            $notifications = $this->notificationService->getUnreadNotifications();
            return $this->responseJSON($notifications);
        } catch (Exception $e) {
            return $this->responseJSON(null, "Failed to get unread notifications");
        }
    }
}
