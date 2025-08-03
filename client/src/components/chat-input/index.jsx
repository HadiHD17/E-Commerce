import { PaperPlaneRightIcon } from "@phosphor-icons/react";
import Input from "@/components/shared/input";
import "./chat-input.css";

export default function ChatInput({ placeholder, onSubmit }) {
    function handleSubmit(e) {
        e.preventDefault();
        onSubmit();
    }

    return (
        <form className="chat-input" onSubmit={handleSubmit}>
            <Input id="chat" rootClassname="flex-1" placeholder={placeholder} />
            <button className="chat-input__submit-button">
                <PaperPlaneRightIcon size={24} aria-label="Send" />
            </button>
        </form>
    );
}
