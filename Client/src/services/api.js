import axios from "axios";
import useAuthStore from "../store/useAuthStore";

/**
 * api.js
 * Centralized Axios instance with interceptors for auth handling.
 */
console.log(import.meta.env.VITE_API_BASE_URL);
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

// Response Interceptor: Handle 401 Unauthorized
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Clear auth store if session expires or token is invalid
            useAuthStore.getState().logout();
        }
        return Promise.reject(error);
    },
);

export default api;
