import { Navigate } from "react-router-dom";
import AuthServices from "../services/auth.service";
import Loading from "./Loading";
import type { ReactNode } from "react";

type ProtectedRouteProps = {
    children: ReactNode;
}

export default function ProtectedRoute(props: ProtectedRouteProps) {
    const { currentUserId, authLoading } = AuthServices();
    if (authLoading) return <Loading/>

    return currentUserId ? <>{props.children}</> : <Navigate to={'/sign-in'}/>
}