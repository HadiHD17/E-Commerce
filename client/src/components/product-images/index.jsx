import { useRef, useState } from "react";
import toBase64 from "@/utils/base64";
import { PlusIcon, XIcon } from "@phosphor-icons/react";
import "./product-images.css";

export default function ProductImages() {
    const fileInputRef = useRef(null);
    const [images, setImages] = useState([]);

    async function handleFileChange(e) {
        const files = Array.from(e.target.files).slice(0, 4 - images.length);
        const base64Images = await Promise.all(files.map(toBase64));
        setImages(prev => [...prev, ...base64Images]);
    }

    return (
        <div className="product-images">
            <p className="product-images__title fs-label-text">
                Product Images
            </p>

            <div className="product-images__list">
                <div
                    className="product-images__add"
                    onClick={() => fileInputRef.current.click()}
                >
                    <span className="product-images__add-icon">
                        <PlusIcon size={24} />
                    </span>
                    <span className="product-images__add-text">Add Image</span>
                </div>
                {images.map((src, idx) => (
                    <div key={idx} className="product-images__item">
                        <img
                            src={src}
                            alt={`uploaded-${idx}`}
                            className="product-images__image"
                        />
                        <button
                            type="button"
                            onClick={() =>
                                setImages(prev =>
                                    prev.filter((_, i) => i !== idx),
                                )
                            }
                            className="product-images__remove-btn d-flex justify-center items-center"
                        >
                            <XIcon size={16} weight="bold" />
                        </button>
                    </div>
                ))}
            </div>

            <span className="product-images__note">
                Max 4 images. The first image will be set as the thumbnail
            </span>

            <input
                disabled={images.length >= 4}
                type="file"
                accept="image/png, image/jpeg"
                className="product-images__input"
                ref={fileInputRef}
                onChange={handleFileChange}
            />
        </div>
    );
}
