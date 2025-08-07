export default function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });
}

export function getBase64Extension(base64) {
    if (!base64.startsWith("data:")) return null;
    const parts = base64.split(";")[0].split("/");
    return parts.length === 2 ? parts[1] : null;
}
