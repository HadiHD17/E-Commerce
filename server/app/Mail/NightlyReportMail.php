<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class NightlyReportMail extends Mailable
{
    use Queueable, SerializesModels;

    public $orders, $orderCount, $totalRevenue;

    public function __construct($orders, $orderCount, $totalRevenue)
    {
        $this->orders = $orders;
        $this->orderCount = $orderCount;
        $this->totalRevenue = $totalRevenue;
    }

    public function build()
    {
        $html = "
        <h2>Nightly Sales Report</h2>
        <p>Orders Today: <strong>{$this->orderCount}</strong></p>
        <p>Total Revenue: <strong>\${$this->totalRevenue}</strong></p>
        <hr>
        <h4>Orders Summary:</h4>
        <ul>";

        foreach ($this->orders as $order) {
            $html .= "<li>Order #{$order->id} - \${$order->total_price} - Status: {$order->status}</li>";
        }


        $html .= "</ul>";

        return $this->subject('Nightly Report')
            ->html($html);
    }
}
