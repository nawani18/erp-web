import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import DepartmentService from "../services/departmentService";

export const useCreateDepartment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => DepartmentService.createDepartment(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["departments"] });
            toast.success("Department created successfully.");
        },
    });
};

export const useUpdateDepartment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) =>
            DepartmentService.updateDepartment(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["departments"] });
            toast.success("Department updated successfully.");
        },
    });
};

export const useDeleteDepartment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => DepartmentService.deleteDepartment(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["departments"] });
            toast.success("Department deleted successfully.");
        },
    });
};
