import { useEffect, useState } from "react";
import type { SignInIntrf, SignUpIntrf, UserAccessIntrf } from "../models/auth.model";
import { useNavigate } from "react-router-dom";

export default function AuthServices() {
    const [authLoading, setAuthLoading] = useState<boolean>(true);
    const [authUser, setAuthUser] = useState<UserAccessIntrf | null>(null);
    const [authError, setAuthError] = useState<string | null>(null);

    const currentUserId = authUser ? authUser.user_id : '';
    const currentUserToken = authUser ? authUser.token : '';
    const navigate = useNavigate();

    useEffect(() => {
        function initAuth() {
            try {
                const userExist = localStorage.getItem('user');
                if (userExist) {
                    const parsedUser = JSON.parse(userExist);
                    setAuthUser(parsedUser);
                }
            } catch (err: any) {
                localStorage.removeItem('user');
                setAuthUser(null);
                setAuthError(err.message || 'Failed to retrieve user data. Please sign in again.');
            } finally {
                setAuthLoading(false); 
            }
        };

        initAuth();
    }, []);

    async function signIn(props: SignInIntrf) {
        setAuthLoading(true);
        setAuthError(null);

        try {
            const request = await fetch(`${import.meta.env.VITE_BASE_API_URL}/auth/sign-in`, {
                body: JSON.stringify(props),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            });

            const response = await request.json();

            if (!request.ok) {
                const errorMessage = response.error || response.message || 'Failed to sign-in! Try again later';
                setAuthError(errorMessage);
                setAuthUser(null);
            } else {
                const currentUser = { 
                    token: response.token, 
                    user_id: response.user_id 
                }
                localStorage.setItem('user', JSON.stringify(currentUser));
                setAuthUser(currentUser);
                setAuthError(null);
            }
        } catch (error: any) {
            setAuthError(error.message || 'Check your internet connection');
        } finally {
            setAuthLoading(false);
        }
    }

    async function signUp(props: SignUpIntrf) {
        setAuthLoading(true);
        setAuthError(null);

        try {
            const request = await fetch(`${import.meta.env.VITE_BASE_API_URL}/auth/sign-up`, {
                body: JSON.stringify(props),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            });

            const response = await request.json();

            if (!request.ok) {
                const errorMessage = response.error || response.message || 'Failed to sign-up! Try again later';
                setAuthError(errorMessage);
            } else {
                setAuthError(null);
                navigate('/sign-in');
            }
        } catch (error: any) {
            setAuthError(error.message || 'Check your internet connection');
        } finally {
            setAuthLoading(false);
        }
    }

    function signOut() {
        setAuthLoading(true);
        setAuthError(null);

        try {
            setAuthError(null);
            setAuthUser(null);
            localStorage.removeItem('user');
            navigate('/sign-in');
        } catch (error: any) {
            setAuthError(error.message || 'Check your internet connection');
        } finally {
            setAuthLoading(false);
        }
    }

    return { 
        currentUserId, currentUserToken, authUser,
        authError, authLoading, setAuthError, signIn, signOut, signUp, 
    }
}