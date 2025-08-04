<?php

namespace App\Services\Admin;

use App\Models\AuditLog;
use Illuminate\Http\Request;

class AuditLogService
{
    static function logAction($userId, $action, $targetType, $targetId, $fromStatus, $toStatus)
    {
        return AuditLog::create([
            'user_id' => $userId,
            'action' => $action,
            'target_type' => $targetType,
            'target_id' => $targetId,
            'from_status' => $fromStatus,
            'to_status' => $toStatus,
        ]);
    }

    static function getAuditLogs()
    {
        return AuditLog::with('user')->orderBy('created_at', 'desc')->get();
    }


} 