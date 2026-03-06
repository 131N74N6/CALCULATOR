import { Navigate } from "react-router-dom";
import AuthServices from "../services/authService";
import type { ReactNode } from "react";

type ProtectedRouteProps = {
    children: ReactNode;
}

export default function ProtectedRoute(props: ProtectedRouteProps) {
    const { currentUserId, loading } = AuthServices();

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-[#1a1a1a]">
                <div className="animate-spin rounded w-12 h-12 border-white"></div>
            </div>
        );
    }

    return currentUserId ? <>{props.children}</> : <Navigate to={'/sign-in'} replace/>
}