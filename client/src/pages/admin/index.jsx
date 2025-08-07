import { Link } from "react-router-dom";
import AdminMetric from "@/components/admin-metric";
import AdminChart from "@/components/admin-chart";
import AdminFeaturedProductsGrid from "@/components/admin-featured-products-grid";
import "./admin.css";

export default function AdminHomePage() {
    return (
        <div className="admin-home-page d-grid gap-16">
            <section className="d-flex gap-4">
                <AdminMetric
                    title="Today's Orders"
                    value={33}
                    changePercentage={10}
                    className="flex-1"
                />
                <AdminMetric
                    title="Today's Revenue"
                    value={1233}
                    changePercentage={-2}
                    className="flex-1"
                    isMoney
                />
            </section>

            <section>
                <AdminChart title="Revenue Analysis" />
            </section>

            <section className="admin-home-page__products">
                <hgroup className="d-flex justify-between items-baseline">
                    <h2 className="fs-h2">Top Selling Products</h2>
                    <Link to="/admin/products">View all →</Link>
                </hgroup>

                <AdminFeaturedProductsGrid />
            </section>
        </div>
    );
}
