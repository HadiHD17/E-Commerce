<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\AuditLogService;
use Illuminate\Http\Request;
use Exception;

class AuditLogController extends Controller
{
    public function getAuditLogs()
    {
        try {
            $auditLogs = AuditLogService::getAuditLogs();
            return $this->responseJSON($auditLogs);
        } catch (Exception $e) {
            return $this->responseJSON(null, "Failed to retrieve audit logs", 500);
        }
    }
} 