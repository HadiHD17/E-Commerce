import cls from "@/utils/classnames";
import styles from "./button.module.css";

const buttonVariants = {
    filled: "button--filled",
    outlined: "button--outlined",
    faded: "button--faded",
};
const buttonColors = {
    brand: "button--brand",
    gray: "button--gray",
    danger: "button--danger",
};

export default function Button({
    type = "button",
    variant = "filled",
    color = "brand",
    className,
    onClick,
    children,
}) {
    return (
        <button
            type={type}
            className={cls(
                buttonVariants[variant],
                buttonColors[color],
                styles.button,
                className,
            )}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
