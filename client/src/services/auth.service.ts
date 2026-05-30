import { useState } from "react";
import type { SignInIntrf, SignUpIntrf, UserIntrf } from "../models/auth.model";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function AuthServices() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [authError, setAuthError] = useState<string | null>(null);

    const { data: authUser, isLoading: authLoading, error: authUserError } = useQuery<UserIntrf | null>({
        queryKey: ['current-user'],
        queryFn: async () => {
            try {
                const request = await fetch(`${import.meta.env.VITE_BASE_API_URL}/user/user-data`, {
                    credentials: 'include',
                    method: 'GET',
                });

                if (!request.ok) return null;
                else return await request.json();
            } catch (err) {
                return null;
            }
        },
        staleTime: Infinity, 
        retry: false       // Jangan lakukan retry jika user memang belum login
    });

    const currentUserId = authUser && authUser.user_id;
    const currentUserName = authUser && authUser.username;

    async function signIn(props: SignInIntrf) {
        setAuthError(null);

        try {
            const request = await fetch(`${import.meta.env.VITE_BASE_API_URL}/auth/sign-in`, {
                body: JSON.stringify(props),
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            });

            const response = await request.json();

            if (!request.ok) {
                const errorMessage = response.error || response.message || 'Failed to sign-in! Try again later';
                throw new Error(errorMessage);
            } else {
                await queryClient.invalidateQueries({ queryKey: ['current-user'] });
                setAuthError(null);
                navigate('/basic-calculator');
            }
        } catch (error: any) {
            setAuthError(error.message || 'Check your internet connection');
        } 
    }

    async function signUp(props: SignUpIntrf) {
        setAuthError(null);

        try {
            const request = await fetch(`${import.meta.env.VITE_BASE_API_URL}/auth/sign-up`, {
                body: JSON.stringify(props),
                credentials: 'include',
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
        } 
    }

    async function signOut() {
        setAuthError(null);
        
        try {
            await fetch(`${import.meta.env.VITE_BASE_API_URL}/auth/log-out`, {
                method: 'POST',
                credentials: 'include'
            });
        } catch (error: any) {
            // Tetap lanjutkan proses logout di frontend meskipun request API logout gagal
        } finally {
            queryClient.setQueryData(['current-user'], null);
            queryClient.clear();
            navigate('/sign-in');
        }
    }

    return { 
        currentUserId, currentUserName, authUser, authUserError,
        authError, authLoading, setAuthError, signIn, signOut, signUp, 
    }
}