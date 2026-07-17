import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getSubjects } from "../services/subjectService.js";

/**
 * Hook to fetch subjects with pagination, search, and department filtering.
 * * @param {string} search - Search query string.
 * @param {number} page - Current page number.
 * @param {number} limit - Number of items per page.
 * @param {number|null} departmentId - Department filter ID.
 * @returns {Object} Query result object containing data, isLoading, isError, error, etc.
 */
export const useSubjects = (
    search = "",
    page = 1,
    limit = 10,
    departmentId = null,
) => {
    return useQuery({
        queryKey: ["subjects", { search, page, limit, departmentId }],
        queryFn: () => getSubjects({ search, page, limit, departmentId }),
        placeholderData: keepPreviousData,
    });
};
