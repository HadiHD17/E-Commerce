import { useState } from "react";
import { Link } from "react-router-dom";
import { PencilSimpleIcon, TrashIcon } from "@phosphor-icons/react";
import api from "@/api";
import { AxiosError } from "axios";
import useAuth from "@/hooks/use-auth";
import DeleteProductPrompt from "@/components/delete-product-prompt";
import cls from "@/utils/classnames";
import "./product-card.css";

export default function ProductCard({
    id,
    name,
    img,
    price,
    stock,
    category,
    newPrice,
    isAdmin = false,
}) {
    const { token } = useAuth();
    const [showDeletePrompt, setShowDeletePrompt] = useState(false);

    async function deleteProduct() {
        try {
            await api.get(`/admin/delete_product/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            window.location.reload();
        } catch (err) {
            console.warn(err instanceof AxiosError ? err.response.data : err);
        }
    }

    const promptDelete = () => setShowDeletePrompt(true);

    return (
        <div className="product-card">
            <div className="product-card__img">
                <img src={img} alt="" />
            </div>

            <div className="product-card__content">
                <Link className="d-contents" to={`/products/${id}`}>
                    <div className="product-card__name">{name}</div>
                    <div className="product-card__category">
                        {category ?? "Other"}
                    </div>
                    <div className="product-card__price">
                        {newPrice ? (
                            <>
                                <div className="original-price">{price}$</div>
                                <div className="current-price">{newPrice}$</div>
                            </>
                        ) : (
                            <div className="current-price">{price}$</div>
                        )}
                    </div>
                </Link>

                <div
                    className={cls("product-card__stock", stock === 0 && "out")}
                >
                    {stock === 0 ? "Out of stock" : `${stock} left in stock`}
                </div>
                {isAdmin && (
                    <div className="product-card__admin-btns d-flex items-center gap-2">
                        <button
                            className="product-card__admin-btn delete d-flex items-center text-danger-700 rounded-md"
                            onClick={promptDelete}
                        >
                            <TrashIcon size={24} />
                        </button>
                        <Link
                            to={`/admin/edit-product/${id}`}
                            className="product-card__admin-btn edit d-flex items-center text-gray-700 rounded-md"
                        >
                            <PencilSimpleIcon size={24} />
                        </Link>
                        {showDeletePrompt && (
                            <DeleteProductPrompt
                                onConfirm={deleteProduct}
                                onCancel={() => setShowDeletePrompt(false)}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
