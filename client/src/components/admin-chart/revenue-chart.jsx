import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
);

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

export default function RevenueChart() {
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
