<?php
namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\User\ChatbotService;


class ChatbotController extends Controller
{
    public function ask(Request $request, ChatbotService $ai)
    {
        $request->validate([
            'message' => 'required|string|max:500',
        ]);

        $reply = $ai->ask($request->input('message'), $request->user());

        return $this->responseJSON($reply);
    }
}
