import { useEffect, useState } from "react";
import type { SignInIntrf, SignUpIntrf, UserAccessIntrf } from "../models/authModel";
import { useNavigate } from "react-router-dom";

export default function AuthServices() {
    const navigate = useNavigate();
    const [authLoading, setAuthLoading] = useState<boolean>(false);
    const [authUser, setAuthUser] = useState<UserAccessIntrf | null>(null);
    const [authError, setAuthError] = useState<string | null>(null);

    useEffect(() => {
        function initAuth() {
            try {
                const userExist = localStorage.getItem('user');
                if (userExist) {
                    const parsedUser = JSON.parse(userExist);
                    setAuthUser(parsedUser);
                }
            } catch (err) {
                localStorage.removeItem('user');
                setAuthUser(null);
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
            } else {
                const currentUser = { token: response.token, user_id: response.user_id }

                localStorage.setItem('user', JSON.stringify(currentUser));
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
        } catch (error: any) {
            setAuthError(error.message || 'Check your internet connection');
        } finally {
            setAuthLoading(false);
        }
    }

    return { 
        currentUserId: authUser ? authUser.user_id : '',
        token: authUser ? authUser.token : '' ,
        authError, authLoading, setAuthError, signIn, signOut, signUp, 
    }
}