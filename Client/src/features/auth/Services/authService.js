import api from "../../../services/api";

/**
 * AuthService
 * Service layer for handling authentication API requests.
 */
const AuthService = {
    /**
     * Logs the user in with provided credentials.
     * @param {Object} credentials - The email and password.
     * @returns {Promise<Object>} The response data.
     */
    login: async (credentials) => {
        try {
            const response = await api.post("/auth/login", credentials);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Fetches the current authenticated user's profile.
     * @returns {Promise<Object>} The user profile data.
     */
    getCurrentUser: async () => {
        try {
            const response = await api.get("/auth/me");
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Handles client-side logout cleanup.
     * @returns {Promise<void>}
     */
    logout: async () => {
        // Frontend-only logout, resolve successfully.
        return Promise.resolve();
    },
};

export default AuthService;
