import api from "../../../services/api";

const DepartmentService = {
    getDepartments: async (params) => {
        try {
            const response = await api.get("/departments", { params });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getDepartmentById: async (id) => {
        try {
            const response = await api.get(`/departments/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createDepartment: async (data) => {
        try {
            const response = await api.post("/departments", data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateDepartment: async (id, data) => {
        try {
            const response = await api.patch(`/departments/${id}`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteDepartment: async (id) => {
        try {
            const response = await api.delete(`/departments/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default DepartmentService;
