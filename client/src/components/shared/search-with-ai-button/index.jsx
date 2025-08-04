import { Link } from "react-router-dom";
import { SparkleIcon } from "@phosphor-icons/react";
import "./search-with-ai-button.css";

export default function SearchWithAiButton() {
    return (
        <Link to="/chat" className="search-with-ai-button">
            <SparkleIcon size={32} weight="duotone" />
            Search with AI
        </Link>
    );
}
