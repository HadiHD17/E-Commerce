import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosError } from "axios";
import { PlusIcon, TrashIcon } from "@phosphor-icons/react";
import ProductImagesInput from "@/components/product-images-input";
import Button from "@/components/shared/button";
import Input from "@/components/shared/input";
import Textarea from "@/components/shared/textarea";
import api from "@/api";
import useAuth from "@/hooks/use-auth";
import ErrorAlert from "@/components/shared/error-alert";
import ProductPageHeading from "../product-page-heading";
import { useFetchDataWithAuth } from "@/hooks/use-fetch-data-with-auth";
import DeleteProductPrompt from "@/components/delete-product-prompt";
import "../new-product/new-product.css";

export default function AdminEditProductPage() {
    const { productId } = useParams();

    const {
        data,
        isLoading,
        error: fetchError,
    } = useFetchDataWithAuth(`admin/products/${productId}`);

    if (isLoading) {
        return <p>Loading product...</p>;
    }
    if (fetchError) {
        return <ErrorAlert error={fetchError} />;
    }

    return (
        <div className="new-product">
            <ProductPageHeading>Edit Product</ProductPageHeading>
            <EditForm initialData={data} />
        </div>
    );
}

function EditForm({ initialData: init = {} }) {
    const { productId } = useParams();
    const { token } = useAuth();
    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [showDeletePrompt, setShowDeletePrompt] = useState(false);

    const [name, setName] = useState(init.name);
    const [description, setDescription] = useState(init.description);
    const [category, setCategory] = useState(init.category);
    const [stock, setStock] = useState(init.stock);
    const [price, setPrice] = useState(init.price);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError(null);
            setIsSubmitting(true);

            await api.post(
                `/admin/add_update_product/${productId}`,
                { name, description, category, price, stock },
                { headers: { Authorization: `bearer ${token}` } },
            );
            navigate("/admin/products");
        } catch (err) {
            if (err instanceof AxiosError) {
                setError(err.response.data);
            } else {
                setError("An unknown error occurred");
            }
            window.scrollTo({ top: 0 });
        } finally {
            setIsSubmitting(false);
        }
    }

    async function deleteProduct() {
        try {
            setError(null);
            setIsSubmitting(true);

            await api.get(`/admin/delete_product/${productId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            window.location.reload();
        } catch (err) {
            if (err instanceof AxiosError) {
                setError(err.response.data);
            } else {
                setError("An unknown error occurred");
            }
            window.scrollTo({ top: 0 });
        } finally {
            setIsSubmitting(false);
        }
    }

    const promptDelete = () => setShowDeletePrompt(true);

    return (
        <form onSubmit={handleSubmit}>
            {error && <ErrorAlert error={error} />}
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
                        step={0.01}
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        required
                    />
                    <ProductImagesInput />
                </fieldset>
            </section>

            <div className="margin-top-some d-flex items-center gap-2 relative">
                <Button
                    type="submit"
                    color="brand"
                    className="d-flex items-center gap-1"
                    disabled={isSubmitting}
                >
                    <PlusIcon weight="bold" /> Save and Publish
                </Button>
                <Button
                    type="button"
                    variant="outlined"
                    color="danger"
                    className="d-flex items-center gap-1"
                    onClick={promptDelete}
                    disabled={isSubmitting}
                >
                    <TrashIcon weight="bold" /> Delete Product
                </Button>
                {showDeletePrompt && (
                    <DeleteProductPrompt
                        onConfirm={deleteProduct}
                        onCancel={() => setShowDeletePrompt(false)}
                    />
                )}
            </div>
        </form>
    );
}
