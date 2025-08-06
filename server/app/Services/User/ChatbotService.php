<?php

namespace App\Services\User;

use App\Models\Product;
use App\Models\ChatMessage;
use App\Models\ProductNotification;
use App\Models\UserContext;
use OpenAI;

class ChatbotService
{
    protected $client;

    public function __construct()
    {
        $this->client = OpenAI::client(config('services.openai.key'));
    }

    public function ask($userMessage, $user)
    {
        ChatMessage::create([
            'user_id' => $user->id,
            'role' => 'user',
            'message' => $userMessage,
        ]);

        $history = ChatMessage::where('user_id', $user->id)
            ->latest()->take(10)->get()->reverse();

        $chatMessages = $history->map(fn($msg) => [
            'role' => $msg->role,
            'content' => $msg->message,
        ])->toArray();

        if (str_contains(strtolower($userMessage), 'yes') || str_contains(strtolower($userMessage), 'notify')) {
            $lastBotMsg = ChatMessage::where('user_id', $user->id)
                ->where('role', 'assistant')->latest()->first();

            if ($lastBotMsg && str_contains(strtolower($lastBotMsg->message), 'out of stock')) {
                $context = UserContext::where('user_id', $user->id)->first();

                if ($context && is_array($context->last_product_ids)) {
                    $products = Product::whereIn('id', $context->last_product_ids)->get();

                    foreach ($products as $product) {
                        ProductNotification::firstOrCreate([
                            'user_id' => $user->id,
                            'product_id' => $product->id,
                        ]);
                    }

                    $reply = "Thanks! You’ll be notified as soon as it's back in stock.";

                    ChatMessage::create([
                        'user_id' => $user->id,
                        'role' => 'assistant',
                        'message' => $reply,
                    ]);

                    return $reply;
                }
            }
        }

        $products = Product::query()
            ->where(function ($query) use ($userMessage) {
                $keywords = explode(' ', strtolower($userMessage));
                foreach ($keywords as $word) {
                    $query->orWhere('name', 'like', "%$word%");
                }
            })
            ->get();

        $outOfStockProducts = $products->filter(fn($p) => $p->stock <= 0);

        if ($outOfStockProducts->isNotEmpty()) {
            $productIds = $outOfStockProducts->pluck('id')->toArray();
            UserContext::updateOrCreate(
                ['user_id' => $user->id],
                ['last_product_ids' => $productIds]
            );
        }

        $productSummaries = $products->isEmpty()
            ? "No matching products found."
            : $products->map(fn($p) => "**{$p->name}**: {$p->description}")->implode("\n\n");

        if ($outOfStockProducts->isNotEmpty()) {
            $names = $outOfStockProducts->pluck('name')->implode(', ');
            $productSummaries .= "\n\nNote: The following products are currently out of stock: $names. If the user wants to be notified when it's back, ask and wait for confirmation.";
        }

        $messages = array_merge([
            ['role' => 'system', 'content' => "You are a helpful product assistant. Only answer based on the following product list:\n\n$productSummaries"],
        ], $chatMessages);

        $response = $this->client->chat()->create([
            'model' => 'gpt-4',
            'messages' => $messages,
        ]);

        $reply = $response['choices'][0]['message']['content'] ?? 'Sorry, I could not generate a response.';

        ChatMessage::create([
            'user_id' => $user->id,
            'role' => 'assistant',
            'message' => $reply,
        ]);

        return $reply;
    }
}
