import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // Disable unnecessary refetches
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,

            // Configure retry logic
            retry: 1,

            // Optional but recommended: set a baseline stale time (e.g., 5 minutes)
            staleTime: 5 * 60 * 1000,
        },
    },
});
