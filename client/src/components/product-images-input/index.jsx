import { useRef } from "react";
import toBase64 from "@/utils/base64";
import { PlusIcon, XIcon } from "@phosphor-icons/react";
import "./product-images-input.css";

export default function ProductImagesInput({ images, onChange }) {
    const fileInputRef = useRef(null);
    // const [images, setImages] = useState([]);

    async function handleFileChange(e) {
        const files = Array.from(e.target.files).slice(0, 1 - images.length);
        const base64Images = await Promise.all(files.map(toBase64));
        onChange([...images, ...base64Images]);
    }

    return (
        <div className="product-images-input">
            <p className="product-images-input__title fs-label-text">
                Product Images
            </p>

            <div className="product-images-input__list">
                <div
                    className="product-images-input__add"
                    onClick={() => fileInputRef.current.click()}
                >
                    <span className="product-images-input__add-icon">
                        <PlusIcon size={24} />
                    </span>
                    <span className="product-images-input__add-text">
                        Add Image
                    </span>
                </div>
                {images.map((src, idx) => (
                    <div key={idx} className="product-images-input__item">
                        <img
                            src={src}
                            alt={`uploaded-${idx}`}
                            className="product-images-input__image"
                        />
                        <button
                            type="button"
                            onClick={() =>
                                onChange(images.filter((_, i) => i !== idx))
                            }
                            className="product-images-input__remove-btn d-flex justify-center items-center"
                        >
                            <XIcon size={16} weight="bold" />
                        </button>
                    </div>
                ))}
            </div>

            {/* <span className="product-images-input__note">
                Max 4 images. The first image will be set as the thumbnail
            </span> */}

            <input
                disabled={images.length >= 1}
                type="file"
                accept="image/png, image/jpeg"
                className="product-images-input__input"
                ref={fileInputRef}
                onChange={handleFileChange}
            />
        </div>
    );
}
