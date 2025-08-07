<?php

namespace App\Services\Admin;

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;

class FailedJobsService
{
    static function getFailedJobs()
    {
        return DB::table('failed_jobs')
            ->select('id', 'uuid', 'connection', 'queue', 'failed_at', 'exception')
            ->orderBy('failed_at', 'desc')
            ->get();
    }

    static function retryFailedJob($id)
    {
        $failedJob = DB::table('failed_jobs')->where('id', $id)->first();
        
        if (!$failedJob) {
            return false;
        }

        try {
            // Retry the failed job using Laravel's command
            Artisan::call('queue:retry', ['id' => $failedJob->uuid]);
            return true;
        } catch (Exception $e) {
            return false;
        }
    }

    static function deleteFailedJob($id)
    {
        $failedJob = DB::table('failed_jobs')->where('id', $id)->first();
        
        if (!$failedJob) {
            return false;
        }

        try {
            DB::table('failed_jobs')->where('id', $id)->delete();
            return true;
        } catch (Exception $e) {
            return false;
        }
    }

    static function retryAllFailedJobs()
    {
        try {
            Artisan::call('queue:retry', ['--all' => true]);
            return ['message' => 'All failed jobs have been retried'];
        } catch (Exception $e) {
            return false;
        }
    }

    static function clearAllFailedJobs()
    {
        try {
            Artisan::call('queue:flush');
            return ['message' => 'All failed jobs have been cleared'];
        } catch (Exception $e) {
            return false;
        }
    }

    static function getFailedJobsCount()
    {
        return DB::table('failed_jobs')->count();
    }

    static function getFailedJobsByQueue($queue)
    {
        return DB::table('failed_jobs')
            ->where('queue', $queue)
            ->select('id', 'uuid', 'connection', 'queue', 'failed_at', 'exception')
            ->orderBy('failed_at', 'desc')
            ->get();
    }
} 