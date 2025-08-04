import { Link } from "react-router-dom";
import ProductCard from "@/components/shared/product-card";
import AdminMetric from "@/components/admin-metric";
import AdminChart from "@/components/admin-chart";
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

            <section className="admin-chart">
                <AdminChart title="Revenue Analysis" />
            </section>

            <section className="admin-home-page__products">
                <hgroup className="d-flex justify-between items-baseline">
                    <h2 className="fs-h2">Top Selling Products</h2>
                    <Link to="/admin/products">View all →</Link>
                </hgroup>

                <div className="admin-home-page__products-grid">
                    {Array(8)
                        .fill(null)
                        .map((_, i) =>
                            i % 3 === 1 ? (
                                <ProductCard
                                    id={i}
                                    category="iPhones"
                                    img=""
                                    name="iPhone 15 Pro Max - Midnight"
                                    price={1300}
                                    stock={0}
                                />
                            ) : (
                                <ProductCard
                                    id={i}
                                    category="Laptop"
                                    img=""
                                    name="Apple MacBook Air 15” w/ Touch ID (2023) - Space Grey"
                                    price={1500}
                                    stock={4}
                                />
                            ),
                        )}
                </div>
            </section>
        </div>
    );
}
