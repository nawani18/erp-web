import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../../../store/useAuthStore";

/**
 * ProtectedRoute.jsx
 * A wrapper component that checks for authentication state.
 * Uses Zustand's persist hydration check to ensure auth state is loaded.
 */
const ProtectedRoute = () => {
    const { user, token } = useAuthStore();
    const [isHydrated, setIsHydrated] = useState(
        useAuthStore.persist.hasHydrated(),
    );

    useEffect(() => {
        // Listen for the store hydration event to ensure state is ready
        const unsub = useAuthStore.persist.onRehydrateStorage(() => {
            setIsHydrated(true);
        });
        return () => unsub();
    }, []);

    // Show a loading state while the store is hydrating from localStorage
    if (!isHydrated) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <p className="text-slate-500">Loading...</p>
            </div>
        );
    }

    // Redirect to login if user or token is missing
    if (!user || !token) {
        return <Navigate to="/login" replace />;
    }

    // Otherwise, render the child routes
    return <Outlet />;
};

export default ProtectedRoute;
