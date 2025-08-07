import { useState } from "react";
import { PaperPlaneRightIcon } from "@phosphor-icons/react";
import Input from "@/components/shared/input";
import "./chat-input.css";

export default function ChatInput({ placeholder, onSubmit }) {
    const [inputValue, setInputValue] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        if (!inputValue.trim()) return;
        onSubmit(inputValue);
        setInputValue("");
    }

    return (
        <form className="chat-input" onSubmit={handleSubmit}>
            <Input
                id="chat"
                rootClassname="flex-1"
                placeholder={placeholder}
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
            />
            <button className="chat-input__submit-button" type="submit">
                <PaperPlaneRightIcon size={24} aria-label="Send" />
            </button>
        </form>
    );
}
