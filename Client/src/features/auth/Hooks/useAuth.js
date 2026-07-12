import useAuthStore  from "../../../store/useAuthStore";
import AuthService from "../services/authService";

/**
 * useAuth.js
 * Custom hook for managing authentication state and API integration.
 */
export const useAuth = () => {
    const {
        user,
        token,
        role,
        login: storeLogin,
        logout: storeLogout,
    } = useAuthStore();

    const isAuthenticated = !!(user && token);

    /**
     * Logs in the user and updates the global auth store.
     * @param {Object} credentials - { email, password }
     * @throws API errors if login fails.
     */
    const login = async (credentials) => {
        try {
            const response = await AuthService.login(credentials);

            // Store user, token, and role in Zustand
            // response.data expected: { user, token }
            storeLogin(response.data.user, response.data.token);

            return response;
        } catch (error) {
            throw error;
        }
    };

    /**
     * Logs out the user and clears the global auth store.
     */
    const logout = () => {
        storeLogout();
    };

    return {
        user,
        token,
        role,
        isAuthenticated,
        login,
        logout,
    };
};
