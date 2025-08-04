import Input from "@/components/shared/input";
import "./new-product.css";
import Textarea from "@/components/shared/textarea";

export default function AdminNewProductPage() {
    return (
        <div className="new-product">
            <ProductPageHeading>New Product</ProductPageHeading>

            <form>
                <section
                    className="d-flex items-start gap-x-8 gap-y-12"
                    style={{}}
                >
                    <div className="flex-1">
                        <Input label="Product Name" id="name" type="text" />
                        <Textarea
                            label="Product Description"
                            id="description"
                        />
                    </div>
                    <div className="flex-1"></div>
                </section>
            </form>
        </div>
    );
}

function ProductPageHeading({ children }) {
    return (
        <h1
            className="product-page-heading fs-h2"
            style={{ marginBottom: "var(--spacing-8)" }}
        >
            {children}
        </h1>
    );
}
