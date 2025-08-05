import axios from "axios";

export const API_URL = "http://localhost:8000/api/v0.1";

const api = axios.create({
    baseURL: API_URL,
    headers: { Accept: "application/json" },
});

export default api;
