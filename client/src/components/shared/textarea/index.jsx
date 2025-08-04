// textarea.jsx
import { useId } from "react";
import cls from "@/utils/classnames";
import "./textarea.css";

export default function Textarea({
    error,
    label,
    id,
    readOnly,
    disabled,
    rootClassname,
    textareaClassname,
    rows = 4,
    ...props
}) {
    const _internalId = useId();
    const textareaId = id ?? _internalId;

    return (
        <div
            className={cls(
                "textarea",
                error && "textarea--error",
                (disabled || readOnly) && "textarea--readonly",
                rootClassname,
            )}
        >
            {label && (
                <label
                    className="textarea__label fs-label-text"
                    htmlFor={textareaId}
                >
                    {label}
                </label>
            )}

            <div className="textarea__control">
                <textarea
                    className={cls("textarea__field", textareaClassname)}
                    id={textareaId}
                    readOnly={readOnly}
                    disabled={disabled}
                    rows={rows}
                    {...props}
                />
            </div>
            {error && <p className="textarea__error fs-caption">{error}</p>}
        </div>
    );
}
