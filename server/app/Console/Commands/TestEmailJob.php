<?php

namespace App\Console\Commands;

use App\Jobs\SendOrderInvoiceEmail;
use App\Models\Order;
use Illuminate\Console\Command;

class TestEmailJob extends Command
{
    protected $signature = 'test:email-job';
    protected $description = 'Test the email invoice job';

    public function handle()
    {
        $this->info('Testing email invoice job...');
        
        $order = Order::first();
        
        if (!$order) {
            $this->error('No orders found in database. Please create an order first.');
            return 1;
        }
        
        SendOrderInvoiceEmail::dispatch($order);
        
        $this->info('Email job dispatched successfully!');
        $this->info('Check the queue worker to see if the job is processed.');
        
        return 0;
    }
} 