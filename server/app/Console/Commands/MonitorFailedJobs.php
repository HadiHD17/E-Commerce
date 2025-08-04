<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\Admin\FailedJobsService;

class MonitorFailedJobs extends Command
{
    protected $signature = 'jobs:monitor';
    protected $description = 'Monitor and report failed jobs';

    public function handle()
    {
        $failedJobsCount = FailedJobsService::getFailedJobsCount();
        
        if ($failedJobsCount > 0) {
            $this->error("⚠️  Found {$failedJobsCount} failed jobs!");
            
            $failedJobs = FailedJobsService::getFailedJobs();
            
            $this->table(
                ['ID', 'Queue', 'Failed At', 'Exception'],
                $failedJobs->map(function ($job) {
                    return [
                        $job->id,
                        $job->queue,
                        $job->failed_at,
                        substr($job->exception, 0, 100) . '...'
                    ];
                })
            );
            
            $this->info("Use 'php artisan queue:retry --all' to retry all failed jobs");
            $this->info("Use 'php artisan queue:flush' to clear all failed jobs");
        } else {
            $this->info("✅ No failed jobs found!");
        }
    }
} 