import { useMemo } from "react";
import { TrendDownIcon, TrendUpIcon } from "@phosphor-icons/react";
import cls from "@/utils/classnames";
import "./admin-metric.css";

export default function AdminMetric({
    title,
    value,
    changePercentage,
    isMoney = false,
    className,
}) {
    const { format: formatNum } = useMemo(
        () =>
            Intl.NumberFormat("en", {
                style: isMoney ? "currency" : "decimal",
                currency: isMoney ? "USD" : undefined,
                maximumFractionDigits: 0,
            }),
        [isMoney],
    );

    return (
        <div className={cls("admin-metric", className)}>
            <h2 className="fs-h2">{title}</h2>
            <div className="admin-metric__body">
                <span className="admin-metric__value">{formatNum(value)}</span>
                <div
                    className={cls(
                        "admin-metric__trend",
                        changePercentage >= 0
                            ? "admin-metric__trend--up"
                            : "admin-metric__trend--down",
                    )}
                >
                    {changePercentage >= 0 ? (
                        <TrendUpIcon size={32} />
                    ) : (
                        <TrendDownIcon size={32} />
                    )}
                    <span>{changePercentage}%</span>
                </div>
            </div>
        </div>
    );
}
