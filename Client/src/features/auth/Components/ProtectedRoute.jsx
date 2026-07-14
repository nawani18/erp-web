import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../../../store/useAuthStore";

const ProtectedRoute = () => {
    const { user, token } = useAuthStore();
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        const hydrateStore = async () => {
            // Rehydrate the persisted state
            await useAuthStore.persist.rehydrate();
            setIsHydrated(true);
        };

        hydrateStore();
    }, []);

    // Show loading until the persisted state is restored
    if (!isHydrated) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <p className="text-slate-500">Loading...</p>
            </div>
        );
    }

    // Redirect unauthenticated users
    if (!user || !token) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
