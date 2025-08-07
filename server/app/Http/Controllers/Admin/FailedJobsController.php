<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\FailedJobsService;
use Illuminate\Http\Request;
use Exception;

class FailedJobsController extends Controller
{
    public function getFailedJobs()
    {
        try {
            $failedJobs = FailedJobsService::getFailedJobs();
            return $this->responseJSON($failedJobs);
        } catch (Exception $e) {
            return $this->responseJSON(null, "Failed to retrieve failed jobs", 500);
        }
    }

    public function retryFailedJob($id)
    {
        try {
            $result = FailedJobsService::retryFailedJob($id);
            
            if ($result) {
                return $this->responseJSON($result, "Job retried successfully");
            }
            
            return $this->responseJSON(null, "Failed job not found", 404);
        } catch (Exception $e) {
            return $this->responseJSON(null, "Failed to retry job", 500);
        }
    }

    public function deleteFailedJob($id)
    {
        try {
            $result = FailedJobsService::deleteFailedJob($id);
            
            if ($result) {
                return $this->responseJSON(null, "Failed job deleted successfully");
            }
            
            return $this->responseJSON(null, "Failed job not found", 404);
        } catch (Exception $e) {
            return $this->responseJSON(null, "Failed to delete job", 500);
        }
    }

    public function retryAllFailedJobs()
    {
        try {
            $result = FailedJobsService::retryAllFailedJobs();
            return $this->responseJSON($result, "All failed jobs retried successfully");
        } catch (Exception $e) {
            return $this->responseJSON(null, "Failed to retry all jobs", 500);
        }
    }

    public function clearAllFailedJobs()
    {
        try {
            $result = FailedJobsService::clearAllFailedJobs();
            return $this->responseJSON($result, "All failed jobs cleared successfully");
        } catch (Exception $e) {
            return $this->responseJSON(null, "Failed to clear all jobs", 500);
        }
    }
} 