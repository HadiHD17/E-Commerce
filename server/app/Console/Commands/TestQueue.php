<?php

namespace App\Console\Commands;

use App\Jobs\SendSMSNotification;
use App\Models\Order;
use Illuminate\Console\Command;

class TestQueue extends Command
{
    protected $signature = 'test:queue';
    protected $description = 'Test the queue system by dispatching a test job';

    public function handle()
    {
        $this->info('Testing queue system...');
        
        // Get a sample order for testing
        $order = Order::first();
        
        if (!$order) {
            $this->error('No orders found in database. Please create an order first.');
            return 1;
        }
        
        // Dispatch a test job
        SendSMSNotification::dispatch($order);
        
        $this->info('Test job dispatched successfully!');
        $this->info('Check the queue worker to see if the job is processed.');
        
        return 0;
    }
} 