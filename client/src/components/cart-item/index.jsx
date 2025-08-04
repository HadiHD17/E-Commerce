import React from "react";
import { MinusIcon, PlusIcon, TrashIcon } from "@phosphor-icons/react";
import "./cart-item.css";

export default function CartItem({ item }) {
    return (
        <div className="cart-item border-subtle rounded-md shadow-2xs">
            <div className="cart-item__info">
                <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item__img"
                />
                <div className="cart-item__details">
                    <span className="cart-item__tag border-subtle rounded-full">
                        {item.category}
                    </span>
                    <p className="cart-item__name fs-label-text">{item.name}</p>
                </div>
            </div>
            <div className="d-flex flex-col items-end gap-y-2">
                <span className="fw-bold">${item.price}</span>

                <div className="d-flex items-center gap-5">
                    <button className="d-inline-flex">
                        <TrashIcon size={24} />
                    </button>

                    <div className="d-flex items-center gap-3">
                        <button className="cart__quantity-btn bg-gray-700 text-white rounded-base d-inline-flex items-center justify-center">
                            <MinusIcon />
                        </button>

                        <span className="cart__quantity-value">1</span>

                        <button className="cart__quantity-btn bg-gray-700 text-white rounded-base d-inline-flex items-center justify-center">
                            <PlusIcon />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
