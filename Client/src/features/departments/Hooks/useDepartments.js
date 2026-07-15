import { useQuery } from "@tanstack/react-query";
import DepartmentService from "../services/departmentService";

export const useDepartments = (search = "", page = 1, limit = 10) => {
    return useQuery({
        queryKey: ["departments", { search, page, limit }],
        queryFn: () =>
            DepartmentService.getDepartments({ search, page, limit }),
        keepPreviousData: true,
    });
};
