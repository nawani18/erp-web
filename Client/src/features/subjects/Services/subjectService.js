import api from "../../../services/api.js";

export const getSubjects = async (params) => {
    try {
        const response = await api.get("/subjects", { params });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getSubjectById = async (id) => {
    try {
        const response = await api.get(`/subjects/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createSubject = async (data) => {
    try {
        const response = await api.post("/subjects", data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateSubject = async (id, data) => {
    try {
        const response = await api.patch(`/subjects/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteSubject = async (id) => {
    try {
        const response = await api.delete(`/subjects/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
