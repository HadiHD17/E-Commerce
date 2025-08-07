import axios from "axios";
import { useState } from "react";
import { MagnifyingGlassIcon, SparkleIcon } from "@phosphor-icons/react";
import ChatSuggestion from "@/components/chat-suggestion";
import ChatInput from "@/components/chat-input";
import ChatMessages from "@/components/chat-messages";
import "./chat.css";

export default function ChatPage() {
    const [isChatting, setIsChatting] = useState(false);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    async function handleSendMessage(userMessage) {
        const token = localStorage.getItem("auth-token");
        setIsChatting(true);

        setMessages(prev => [
            ...prev,
            { id: Date.now(), sender: "human", text: userMessage },
        ]);

        setLoading(true);

        try {
            const response = await axios.post(
                "http://localhost:8000/api/v0.1/chatbot/ask",
                { message: userMessage },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                },
            );

            const botReply = response.data.payload;

            setMessages(prev => [
                ...prev,
                { id: Date.now() + 1, sender: "bot", text: botReply },
            ]);
        } catch (err) {
            console.error("Chat error:", err);
            setMessages(prev => [
                ...prev,
                {
                    id: Date.now() + 1,
                    sender: "bot",
                    text: "Oops! Something went wrong.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="chat-page">
            <header className="chat-page__header">
                <p className="container d-flex items-center justify-center gap-2 fs-h2 text-center">
                    <SparkleIcon weight="duotone" size={32} />
                    Welcome to Search with AI 👋
                </p>
            </header>

            <section className="chat-page__body">
                {!isChatting && (
                    <hgroup className="d-flex flex-col items-center gap-4 text-gray-700">
                        <MagnifyingGlassIcon size={64} />
                        <h1 className="fs-h1">What are you looking for?</h1>
                    </hgroup>
                )}

                <div>
                    {isChatting ? (
                        <>
                            <ChatMessages messages={messages} />
                            {loading && (
                                <div className="ai-loading-message">
                                    <div className="ai-loading-dot" />
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="d-flex flex-col items-start gap-2">
                            <ChatSuggestion>
                                I want a budget laptop tailored for designers.
                            </ChatSuggestion>
                            <ChatSuggestion>
                                Which 4K TV is best for HBO?
                            </ChatSuggestion>
                            <ChatSuggestion>
                                I&apos;m looking for deals on smart home
                                gadgets.
                            </ChatSuggestion>
                        </div>
                    )}

                    <ChatInput
                        placeholder="Write your message..."
                        onSubmit={handleSendMessage}
                    />
                </div>
            </section>
        </div>
    );
}
