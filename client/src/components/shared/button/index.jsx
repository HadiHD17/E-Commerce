import styles from "./button.module.css";

export default function Button({ type = "button", variant, children }) {
    return (
        <button type={type} className={styles.button}>
            {children}
        </button>
    );
}
