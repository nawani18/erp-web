import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../../../store/useAuthStore";

/**
 * RoleBasedRoute.jsx
 * A wrapper component that checks the authenticated user's role.
 * If the role is allowed, it renders the child routes (Outlet).
 * If not, it redirects the user to the unauthorized page.
 */
const RoleBasedRoute = ({ allowedRoles }) => {
    const { role } = useAuthStore();

    // If the user's role is not included in the allowed list, redirect
    if (!allowedRoles.includes(role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
};

export default RoleBasedRoute;
