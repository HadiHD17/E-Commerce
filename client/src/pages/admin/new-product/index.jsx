import { PlusIcon } from "@phosphor-icons/react";
import Input from "@/components/shared/input";
import Textarea from "@/components/shared/textarea";
import ProductImages from "@/components/product-images";
import Button from "@/components/shared/button";
import "./new-product.css";

export default function AdminNewProductPage() {
    return (
        <div className="new-product">
            <ProductPageHeading>New Product</ProductPageHeading>

            <form>
                <section className="new-product__form-wrapper">
                    <fieldset className="flex-1 d-flex flex-col gap-y-4">
                        <Input label="Product Name" id="name" type="text" />
                        <Textarea
                            label="Product Description"
                            id="description"
                            rows={8}
                        />
                        <div className="d-flex gap-4">
                            <label className="d-block fs-label-text">
                                <div>Category</div>
                                <select name="category" id="category">
                                    <option value="smart-home">
                                        Smart Home Devices
                                    </option>
                                    <option value="computer-parts">
                                        Computer Parts
                                    </option>
                                    <option value="laptops">Laptops</option>
                                    <option value="smartphones">
                                        Smartphones
                                    </option>
                                    <option value="home-appliances">
                                        Home Appliances
                                    </option>
                                    <option value="gaming">
                                        Gaming Devices
                                    </option>
                                    <option value="tvs">TVs</option>
                                    <option value="other">Other</option>
                                </select>
                            </label>
                            <Input label="Brand Name" placeholder="Apple" />
                        </div>
                    </fieldset>
                    <fieldset className="flex-1 d-flex flex-col gap-y-4">
                        <Input label="Stock Count" id="stock" type="number" />
                        <Input
                            label="SKU / Product Code"
                            id="sku"
                            type="text"
                        />
                        <Input label="Price" id="price" type="number" />
                        <div className="d-flex gap-4">
                            <label className="d-block fs-label-text">
                                <div>On-Sale</div>
                                <input
                                    type="checkbox"
                                    name="on-sale"
                                    id="on-sale"
                                />
                            </label>
                            <Input
                                label="Sale Price"
                                id="sale-price"
                                type="number"
                            />
                        </div>
                        <ProductImages />
                    </fieldset>
                </section>

                <div className="new-product__create-btn">
                    <Button color="brand" className="d-flex items-center gap-1">
                        <PlusIcon weight="bold" /> Create and Publish
                    </Button>
                </div>
            </form>
        </div>
    );
}

function ProductPageHeading({ children }) {
    return <h1 className="product-page-heading fs-h2">{children}</h1>;
}
