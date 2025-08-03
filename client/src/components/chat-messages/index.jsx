import cls from "@/utils/classnames";
import "./chat-messages.css";

export default function ChatMessages({ messages }) {
    return (
        <div className="chat-messages">
            {messages.map(msg => (
                <p
                    key={msg.id}
                    className={cls(
                        "chat-messages__message",
                        msg.sender === "bot"
                            ? "chat-messages__message--bot"
                            : "chat-messages__message--human",
                    )}
                >
                    {msg.text}
                </p>
            ))}
        </div>
    );
}
