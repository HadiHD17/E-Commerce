import RevenueChart from "./revenue-chart";
import "./admin-chart.css";

export default function AdminChart({ title }) {
    return (
        <>
            <hgroup className="admin-chart__header">
                <h2 className="fs-h2">{title}</h2>
                <div>
                    <span>Show</span>
                    <select
                        id="show-duration"
                        name="show-duration"
                        defaultValue="1m"
                    >
                        <option value="1d">From yesterday</option>
                        <option value="3d">Last 3 days</option>
                        <option value="1w">Last week</option>
                        <option value="1m">Last month</option>
                        <option value="3m">Last 3 months</option>
                        <option value="6m">Last 6 months</option>
                        <option value="1y">Last year</option>
                    </select>
                </div>
            </hgroup>

            <div className="admin-chart" style={{ maxHeight: 400 }}>
                <RevenueChart />
            </div>
        </>
    );
}
