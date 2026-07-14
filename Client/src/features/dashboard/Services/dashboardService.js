import api from "../../../services/api.js";

export const dashboardService = {
    /**
     * Fetches dashboard statistics.
     * @returns {Promise<Object>} Dashboard data
     */
    getDashboard: async () => {
        try {
            const response = await api.get("/dashboard");
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};
