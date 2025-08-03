import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
} from "chart.js";
import "./admin-chart.css";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
);

export default function AdminChart({ title }) {
    return (
        <>
            <hgroup className="admin-chart__header">
                <h2 className="admin-chart__heading">{title}</h2>
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

            <div className="admin-chart" style={{ maxHeight: 300 }}>
                <RevenueChart />
            </div>
        </>
    );
}

const chartData = {
    labels: [
        "June 1",
        "June 15",
        "July 1",
        "July 15",
        "August 1",
        "August 15",
        "August 31",
    ],
    datasets: [
        {
            label: "Revenue (USD)",
            data: [1200, 1150, 1400, 1320, 1400, 1510, 1520],
            fill: false,
            borderColor: "hsla(236, 80%, 57%, 1)",
            tension: 0.3,
        },
    ],
};
const chartOptions = {
    responsive: true,
    plugins: {},
    maintainAspectRatio: false,
    color: "black",
};

function RevenueChart() {
    return (
        <Line
            style={{ maxWidth: "100%" }}
            data={chartData}
            options={chartOptions}
            width={100}
            height={400}
        />
    );
}
