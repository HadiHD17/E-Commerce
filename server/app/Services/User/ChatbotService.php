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
        
        $products = Product::query()
            ->where(function ($query) use ($userMessage) {
                $keywords = explode(' ', strtolower($userMessage));
                foreach ($keywords as $word) {
                    $query->orWhere('name', 'like', "%$word%");
                }
            })
            ->get();

     
        if ($products->isEmpty()) {
            return "Sorry, we couldn’t find any product matching your request.";
        }

        $productSummaries = $products->map(fn($p) => "**{$p->name}**: {$p->description}")->implode("\n\n");

        $prompt = "You are an AI assistant. Here are the products available:\n\n$productSummaries\n\nUser question: $userMessage";

        $response = $this->client->chat()->create([
            'model' => 'gpt-4',
            'messages' => [
                ['role' => 'system', 'content' => 'You are a helpful product assistant. Only answer based on the provided product list.'],
                ['role' => 'user', 'content' => $prompt],
            ],
        ]);

        return $response['choices'][0]['message']['content'] ?? 'Sorry, I could not generate a response.';
    }
}
