import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { PlusIcon } from "@phosphor-icons/react";
import ProductImagesInput from "@/components/product-images-input";
import Button from "@/components/shared/button";
import Input from "@/components/shared/input";
import Textarea from "@/components/shared/textarea";
import api from "@/api";
import useAuth from "@/hooks/use-auth";
import ErrorAlert from "@/components/shared/error-alert";
import ProductPageHeading from "../product-page-heading";
import { getBase64Extension } from "@/utils/base64";

export default function AdminNewProductPage() {
    const { token } = useAuth();
    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Laptop");
    const [stock, setStock] = useState(0);
    const [price, setPrice] = useState(0);
    const [images, setImages] = useState([]);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError(null);
            setIsSubmitting(true);

            const { data } = await api.post(
                "/admin/add_update_product",
                { name, description, category, price, stock },
                { headers: { Authorization: `bearer ${token}` } },
            );

            if (images[0]) {
                const imgExt = getBase64Extension(images[0]);
                await api.post(
                    "/admin/add_update_product_image",
                    {
                        base64: images[0],
                        product_id: data.payload.id,
                        file_name: "test." + imgExt,
                    },
                    { headers: { Authorization: `bearer ${token}` } },
                );
            }

            navigate("/admin/products");
        } catch (err) {
            if (err instanceof AxiosError) {
                console.warn(err.response.data);
                setError(err.response.data);
            } else {
                setError("An unknown error occurred");
            }
            window.scrollTo({ top: 0 });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="new-product">
            <ProductPageHeading>New Product</ProductPageHeading>
            {error && <ErrorAlert error={error} />}

            <form onSubmit={handleSubmit}>
                <section className="new-product__form-wrapper">
                    <fieldset className="flex-1 d-flex flex-col gap-y-4">
                        <Input
                            label="Product Name"
                            id="name"
                            type="text"
                            placeholder="iPhone 15 Pro Max"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />
                        <Textarea
                            label="Product Description"
                            id="description"
                            rows={12}
                            placeholder="Enter description..."
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            required
                        />
                        <div className="select-field fs-label-text flex-1">
                            <label htmlFor="category" className="d-block">
                                Category
                            </label>
                            <select
                                name="category"
                                id="category"
                                className="rounded-md shadow-2xs"
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                                required
                            >
                                <option value="Laptop">Laptop</option>
                                <option value="Smart Home">
                                    Smart Home Devices
                                </option>
                                <option value="Headphones">Headphones</option>
                                <option value="Smartphone">Smartphone</option>
                                <option value="Home Appliance">
                                    Home Appliance
                                </option>
                                <option value="Monitor">Monitor</option>
                                <option value="TV">TV</option>
                            </select>
                        </div>
                    </fieldset>
                    <fieldset className="flex-1 d-flex flex-col gap-y-4">
                        <Input
                            label="Stock Count"
                            id="stock"
                            type="number"
                            min={0}
                            value={stock}
                            onChange={e => setStock(e.target.value)}
                            required
                        />
                        <Input
                            label="Price"
                            id="price"
                            type="number"
                            min={0}
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            required
                        />
                        <ProductImagesInput
                            images={images}
                            onChange={setImages}
                        />
                    </fieldset>
                </section>

                <div className="margin-top-some">
                    <Button
                        type="submit"
                        color="brand"
                        className="d-flex items-center gap-1"
                        disabled={isSubmitting}
                    >
                        <PlusIcon weight="bold" /> Save and Publish
                    </Button>
                </div>
            </form>
        </div>
    );
}
