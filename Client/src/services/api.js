import axios from "axios";
import useAuthStore from "../store/useAuthStore";
import { toast } from "react-toastify";

/**
 * api.js
 * Centralized Axios instance with interceptors for auth handling and global error notifications.
 */
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request Interceptor: Attach token from Zustand
api.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

// Response Interceptor: Handle 401 Unauthorized and Global Toasts
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;

        // 1. Extract backend message or determine fallback message
        let message = error.response?.data?.message;

        if (!message) {
            if (error.code === "ECONNABORTED") {
                message = "Request timeout. Please try again.";
            } else if (!error.response) {
                message =
                    "Backend unavailable. Please check your network connection.";
            } else {
                message = "An unexpected error occurred.";
            }
        }

        // 2. Handle 401 Unauthorized
        if (status === 401) {
            useAuthStore.getState().logout();
        }

        // 3. Show deduplicated toasts for specific statuses and network errors
        const toastableStatuses = [400, 401, 403, 404, 409, 422, 429, 500];
        const isNetworkOrTimeout =
            !error.response || error.code === "ECONNABORTED";

        if (isNetworkOrTimeout || toastableStatuses.includes(status)) {
            // Using the message as toastId inherently prevents duplicate toasts in React Toastify
            toast.error(message, { toastId: message });
        }

        return Promise.reject(error);
    },
);

export default api;
