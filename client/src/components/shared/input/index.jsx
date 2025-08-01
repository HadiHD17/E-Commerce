import { useId, useState } from "react";
import cls from "@/utils/classnames";
import EyeClosedIcon from "@/icons/eye-closed";
import EyeIcon from "@/icons/eye";
import styles from "./input.module.css";

export default function Input({
    error,
    type = "text",
    withPasswordToggle,
    label,
    id,
    readOnly,
    className,
    ...props
}) {
    const [showPassword, setShowPassword] = useState(false);
    const _internalId = useId();
    const inputId = id ?? _internalId; // set an internal id for semantics and a11y, if not provided externally

    const passwordType = showPassword ? "text" : "password";

    if (type !== "password" && withPasswordToggle) {
        throw new Error(
            "<Input> component's `withPasswordToggle` prop can only be used with type='password'",
        );
    }

    return (
        <div
            className={cls(
                styles.input,
                error && styles["input--error"],
                readOnly && styles["input--readonly"],
                className,
            )}
        >
            {label && (
                <label
                    className={cls(styles.input__label, "fs-label-text")}
                    htmlFor={inputId}
                >
                    {label}
                </label>
            )}

            <div
                className={cls(
                    styles.input__control,
                    "rounded-md d-flex justify-between items-center",
                )}
            >
                <input
                    className={cls(styles.input__field, "flex-grow", className)}
                    id={inputId}
                    type={type === "password" ? passwordType : type}
                    readOnly={readOnly}
                    {...props}
                />
                {type === "password" && withPasswordToggle && (
                    <button
                        type="button"
                        className={styles["input__password-toggle"]}
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeClosedIcon /> : <EyeIcon />}
                    </button>
                )}
            </div>
            {error && (
                <p className={cls(styles.input__error, "fs-caption")}>
                    {error}
                </p>
            )}
        </div>
    );
}
