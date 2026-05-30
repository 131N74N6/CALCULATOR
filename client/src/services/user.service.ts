import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UserIntrf } from "../models/auth.model";
import DataServices from "./data.service";
import AuthServices from "./auth.service";
import { useState } from "react";

export default function UserServices() {
    const queryClient = useQueryClient();
    const { authUser, authError, authLoading, currentUserId, signOut } = AuthServices();
    const { changeData, deleteData, messageText, setMessageText } = DataServices();

    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [inEdit, setInEdit] = useState<boolean>(false);

    const changeUserDataMt = useMutation({
        onMutate: () => setIsProcessing(false),
        mutationFn: async (username: string) => {
            await changeData<UserIntrf>({
                api_url: `${import.meta.env.VITE_BASE_API_URL}/user/edit/${currentUserId}`,
                data: { username: username.trim() }
            });
        },
        onError: () => {},
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['current-user'] });
            setInEdit(false);
        },
        onSettled: () => setIsProcessing(false)
    });

    const deleteUserDataMt = useMutation({
        onMutate: () => setIsProcessing(false),
        mutationFn: async () => {
            await deleteData(`${import.meta.env.VITE_BASE_API_URL}/user/rm/${currentUserId}`);
        },
        onError: () => {},
        onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey: [`basic-calculator-data-${currentUserId}`] });
            queryClient.invalidateQueries({ queryKey: [`bmi-calculator-data-${currentUserId}`] });
            queryClient.invalidateQueries({ queryKey: ['current-user'] });
            await signOut();
        },
        onSettled: () => setIsProcessing(false)
    });

    return { 
        changeUserDataMt, currentUserId, deleteUserDataMt, inEdit, isProcessing, messageText, 
        setInEdit, setIsProcessing, setMessageText, authUser, authError, authLoading 
    }
}