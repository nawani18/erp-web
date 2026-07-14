import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services/dashboardService.js";

/**
 * Hook to fetch dashboard statistics.
 * Provides loading, error, and data states using TanStack Query.
 */
export const useDashboard = () => {
    return useQuery({
        queryKey: ["dashboard"],
        queryFn: () => dashboardService.getDashboard(),
    });
};
