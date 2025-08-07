<?php

namespace App\Http\Controllers\Common;

use App\Http\Controllers\Controller;
use App\Models\WebhookLog;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;
use Exception;

class WebhookController extends Controller
{
    public function handleOrderWebhook(Request $request)
    {
        try {
            $payload = $request->all();
            
            // Log the webhook payload
            WebhookLog::create([
                'payload' => json_encode($payload),
                'status' => 'received'
            ]);

            return $this->responseJSON(['message' => 'Webhook received successfully']);
        } catch (Exception $e) {
            return $this->responseJSON(null, "Failed to process webhook", 500);
        }
    }
} 