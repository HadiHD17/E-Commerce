<?php

namespace App\Listeners;

use App\Events\OrderCreated;
use App\Jobs\SendOrderInvoiceEmail;
use App\Jobs\UpdateProductStock;
use App\Jobs\SendWebhookNotification;
use App\Jobs\SendSMSNotification;
use App\Jobs\LogOrderAnalytics;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class OrderCreatedListener implements ShouldQueue
{
    use InteractsWithQueue;

    public function handle(OrderCreated $event): void
    {
        $order = $event->order;

        SendOrderInvoiceEmail::dispatch($order);
        UpdateProductStock::dispatch($order);
        SendWebhookNotification::dispatch($order);
        SendSMSNotification::dispatch($order);
        LogOrderAnalytics::dispatch($order);
    }
} 