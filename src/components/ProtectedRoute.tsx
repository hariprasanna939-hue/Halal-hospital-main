import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "@/lib/auth";

const ProtectedRoute = ({ role }: { role?: string }) => {
    const auth = isAuthenticated();
    const userRole = localStorage.getItem("role");

    if (!auth) {
        return <Navigate to="/login" replace />;
    }

    if (role && userRole !== role) {
        return <Navigate to="/home" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
