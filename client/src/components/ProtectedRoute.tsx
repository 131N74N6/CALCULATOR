import { Navigate } from "react-router-dom";
import AuthServices from "../services/auth.service";
import Loading from "./Loading";
import type { ReactNode } from "react";

type ProtectedRouteProps = {
    children: ReactNode;
}

export default function ProtectedRoute(props: ProtectedRouteProps) {
    const { authLoading, currentUserId } = AuthServices();

    if (authLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-[#1a1a1a]">
                <Loading/>
            </div>
        );
    }

    if (!currentUserId) {
        return <Navigate to={'/sign-in'} replace/>;
    }

    return currentUserId ? <>{props.children}</> : <Navigate to={'/sign-in'} replace/>;
}