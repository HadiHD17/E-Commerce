import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import api from "@/api";
import useAuth from "./use-auth";

/** A helper hook for fetching data from API, with loading/error states & cancelling race requests */
export function useFetchDataWithAuth(url, initialData = []) {
    const { token, isLoading: isAdminLoading } = useAuth();
    const [data, setData] = useState(initialData);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isAdminLoading) return;

        const controller = new AbortController();
        (async () => {
            try {
                setIsLoading(true);

                const { data } = await api.get(url, {
                    headers: token
                        ? { Authorization: `bearer ${token}` }
                        : undefined,
                    signal: controller.signal,
                });
                setData(data.payload ?? data);
            } catch (err) {
                if (err instanceof AxiosError) {
                    setError(err.response.data);
                } else {
                    setError("An unknown error occurred");
                }
            } finally {
                setIsLoading(false);
            }
        })();
        return () => controller.abort();
    }, [isAdminLoading, token, url]);

    return { data, isLoading, error };
}
