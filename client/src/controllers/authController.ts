import { useEffect, useState } from "react";
import type { SignInIntrf, SignUpIntrf, UserIntrf } from "../models/authModel";
import { useNavigate } from "react-router-dom";

export default function AuthController() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [user, setUser] = useState<UserIntrf | null>(null);
    const [authError, setAuthError] = useState<string | null>(null);

    useEffect(() => {
        function initAuth() {
            try {
                const userExist = localStorage.getItem('user');
                if (userExist) {
                    const parsedUser = JSON.parse(userExist);
                    setUser(parsedUser);
                }
            } catch (err) {
                localStorage.removeItem('user');
            } finally {
                setLoading(false); 
            }
        };

        initAuth();
    }, []);

    async function signIn(props: SignInIntrf) {
        setLoading(true);
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
                const currentUser = { 
                    status: response.status, 
                    token: response.status, 
                    id: response.status, 
                    username: response.status
                }

                setAuthError(null);
                localStorage.setItem('user', JSON.stringify(currentUser));
                setUser(currentUser);
            }
        } catch (error: any) {
            setAuthError(error.message || 'Check your internet connection');
        } finally {
            setLoading(false);
        }
    }

    async function signUp(props: SignUpIntrf) {
        setLoading(true);
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
            setLoading(false);
        }
    }

    function signOut() {
        setLoading(true);

        try {
            setAuthError(null);
            setUser(null);
            localStorage.removeItem('user');
        } catch (error: any) {
            setAuthError(error.message || 'Check your internet connection');
        } finally {
            setLoading(false);
        }
    }

    return { authError, loading, user, setAuthError, signIn, signOut, signUp }
}