import Button from "../shared/button";
import "./delete-product-prompt.css";

export default function DeleteProductPrompt({ onConfirm, onCancel }) {
    return (
        <div className="delete-product-prompt">
            <p>You sure you wanna delete?</p>
            <div className="d-flex items-center gap-2">
                <Button color="danger" onClick={onConfirm}>
                    Delete
                </Button>
                <Button variant="outlined" color="gray" onClick={onCancel}>
                    Cancel
                </Button>
            </div>
        </div>
    );
}
