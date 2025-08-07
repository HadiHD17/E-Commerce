import cls from "@/utils/classnames";
import styles from "./button.module.css";

export default function Button({
    type = "button",
    variant = "filled",
    color = "brand",
    className,
    onClick,
    disabled,
    children,
}) {
    return (
        <button
            type={type}
            className={cls(
                styles.button,
                styles[`button--var-${variant}`],
                styles[`button--clr-${color}`],
                className,
            )}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
