// Hooks/useDepartmentOptions.js

import { useQuery } from "@tanstack/react-query";
import DepartmentService from "../services/departmentService";

export const useDepartmentAll = () => {
    return useQuery({
        queryKey: ["department-options"],
        queryFn: () =>
            DepartmentService.getDepartments({
                search: "",
                page: 1,
                limit: 1000, // or a sufficiently large number
            }),
    });
};
