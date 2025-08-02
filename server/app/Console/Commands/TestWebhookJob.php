<?php

namespace App\Console\Commands;

use App\Jobs\SendWebhookNotification;
use App\Models\Order;
use Illuminate\Console\Command;

class TestWebhookJob extends Command
{
    protected $signature = 'test:webhook-job';
    protected $description = 'Test the webhook notification job';

    public function handle()
    {
        $this->info('Testing webhook notification job...');
        
        $order = Order::first();
        
        if (!$order) {
            $this->error('No orders found in database. Please create an order first.');
            return 1;
        }
        
        SendWebhookNotification::dispatch($order);
        
        $this->info('Webhook job dispatched successfully!');
        $this->info('Check the queue worker to see if the job is processed.');
        
        return 0;
    }
} 