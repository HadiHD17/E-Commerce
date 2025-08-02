<?php

namespace App\Console\Commands;

use App\Jobs\LogOrderAnalytics;
use App\Models\Order;
use Illuminate\Console\Command;

class TestAnalyticsJob extends Command
{
    protected $signature = 'test:analytics-job';
    protected $description = 'Test the analytics logging job';

    public function handle()
    {
        $this->info('Testing analytics logging job...');
        
        $order = Order::first();
        
        if (!$order) {
            $this->error('No orders found in database. Please create an order first.');
            return 1;
        }
        
        LogOrderAnalytics::dispatch($order);
        
        $this->info('Analytics job dispatched successfully!');
        $this->info('Check the queue worker to see if the job is processed.');
        
        return 0;
    }
} 