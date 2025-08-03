<?php

namespace App\Services\User;

use Illuminate\Support\Str;
use App\Models\Product;

use OpenAI;

class ChatbotService
{
    protected $client;

    public function __construct()
    {
        $this->client = OpenAI::client(config('services.openai.key'));
    }


    public function ask($userMessage)
    {
        $productKeywords = ['have', 'compare', 'recommend', 'buy', 'best', 'price', 'details', 'stock'];
        $lowerMessage = strtolower($userMessage);
        $isProductQuery = collect($productKeywords)->contains(fn($word) => str_contains($lowerMessage, $word));

        if ($isProductQuery) {
            $products = Product::query()
                ->where(function ($query) use ($lowerMessage) {
                    $keywords = explode(' ', $lowerMessage);
                    foreach ($keywords as $word) {
                        $query->orWhere('name', 'like', "%$word%");
                    }
                })
                ->get();

            if ($products->isEmpty()) {
                return "Sorry, we couldn’t find any product matching your request.";
            }

            $outOfStockProducts = [];

            $productSummaries = $products->map(function ($p) use (&$outOfStockProducts) {
                if ($p->stock == 0) {
                    $outOfStockProducts[] = $p;
                    return "**{$p->name}** (Out of stock): {$p->description}";
                }
                return "**{$p->name}**: {$p->description}";
            })->implode("\n\n");

            session(['chatbot_out_of_stock' => collect($outOfStockProducts)->pluck('id')->toArray()]);

            $prompt = "You are an AI assistant. Here are the products available:\n\n$productSummaries\n\nUser question: $userMessage";

            $messages = [
                ['role' => 'system', 'content' => 'You are a helpful product assistant. Only answer based on the provided product list. If any product is out of stock, inform the user and ask if they want to be notified when it’s back.'],
                ['role' => 'user', 'content' => $prompt],
            ];
        } else {
           
            if (strtolower(trim($userMessage)) === 'yes' && session()->has('chatbot_out_of_stock')) {
                $productIds = session('chatbot_out_of_stock');
                // Save to database, example:
                // foreach ($productIds as $id) {
                //     StockAlert::create([
                //         'email' => auth()->user()->email ?? 'guest@example.com',
                //         'product_id' => $id,
                //     ]);
                // }

                return "Thanks! You'll be notified when the product(s) you're interested in are back in stock. $productIds";
            }

            $messages = [
                ['role' => 'system', 'content' => 'You are a helpful AI assistant in an electronics store.'],
                ['role' => 'user', 'content' => $userMessage],
            ];
        }

        $response = $this->client->chat()->create([
            'model' => 'gpt-4',
            'messages' => $messages,
        ]);

        return $response['choices'][0]['message']['content'] ?? 'Sorry, I could not generate a response.';
    }
}
