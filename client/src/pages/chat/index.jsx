import { useState } from "react";
import { MagnifyingGlassIcon, SparkleIcon } from "@phosphor-icons/react";
import ChatSuggestion from "@/components/chat-suggestion";
import ChatInput from "@/components/chat-input";
import ChatMessages from "@/components/chat-messages";
import "./chat.css";

const chatMessages = [
    { id: 1, sender: "human", text: "Hello, how are you?" },
    {
        id: 2,
        sender: "bot",
        text: "I'm good, thank you! How can I help you today?",
    },
    { id: 3, sender: "human", text: "Can you tell me a joke?" },
    {
        id: 4,
        sender: "bot",
        text: "Why don't skeletons fight each other? They don't have the guts.",
    },
    { id: 5, sender: "human", text: "Haha, that's funny!" },
];

export default function ChatPage() {
    const [isChatting, setIsChatting] = useState(false);

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
                        <ChatMessages messages={chatMessages} />
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
                        onSubmit={() => setIsChatting(true)}
                    />
                </div>
            </section>
        </div>
    );
}
