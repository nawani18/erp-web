import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * authStore.js
 * Zustand store with persistence for authentication state.
 */
const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            token: null,
            role: null,

            // Stores user, token, and derives role
            login: (user, token) =>
                set({
                    user,
                    token,
                    role: user?.role || null,
                }),

            // Clears all authentication state
            logout: () =>
                set({
                    user: null,
                    token: null,
                    role: null,
                }),

            // Updates user profile, ensuring role is synced
            setUser: (user) =>
                set({
                    user,
                    role: user?.role || null,
                }),

            // Explicit clear action
            clearAuth: () =>
                set({
                    user: null,
                    token: null,
                    role: null,
                }),
        }),
        {
            name: "auth-storage", // Key in localStorage
        },
    ),
);

export default useAuthStore;
