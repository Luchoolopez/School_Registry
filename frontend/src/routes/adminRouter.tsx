import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context";

export const AdminRoute = () => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/iniciar-sesion" replace />;
    }

    if (user.role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};