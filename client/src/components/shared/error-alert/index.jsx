import "./error-alert.css";

export default function ErrorAlert({ error }) {
    let message = error;
    if (typeof error === "object" && "message" in error) {
        message = error.message;
    } else if (typeof error === "object" && "status" in error) {
        message = error.status;
    }

    return <p className="error-alert">{message}</p>;
}
