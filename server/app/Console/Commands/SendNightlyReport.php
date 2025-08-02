<?php
namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use App\Mail\NightlyReportMail;
use App\Models\Order;
use Carbon\Carbon;

class SendNightlyReport extends Command
{
    protected $signature = 'report:nightly';
    protected $description = 'Send a nightly report to the admin with order stats';

    public function handle()
    {
        $today = Carbon::today();

        $orders = Order::whereDate('created_at', $today)
        ->whereIn('status', ['paid', 'packed', 'shipped'])
        ->get();

         $orderCount = $orders->count();
    $totalRevenue = $orders->sum('total_price');

        $adminEmail = config('mail.admin_report_email', 'admin@example.com');

        Mail::to($adminEmail)->send(new NightlyReportMail($orders, $orderCount, $totalRevenue));

        $this->info("Sent nightly report: $orderCount orders, \$$totalRevenue total.");
    }


}
