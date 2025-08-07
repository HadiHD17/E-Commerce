import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import Button from "@/components/shared/button";

export default function ChatSuggestion({ onClick, children }) {
    return (
        <Button
            variant="faded"
            color="gray"
            className="d-flex items-center gap-2 text-gray-700"
            onClick={onClick}
        >
            <MagnifyingGlassIcon size={18} />
            <span>{children}</span>
        </Button>
    );
}
