import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UserIntrf } from "../models/auth.model";
import DataServices from "./data.service";
import AuthServices from "./auth.service";
import { useState } from "react";

export default function UserServices() {
    const queryClient = useQueryClient();
    const { currentUserId, signOut } = AuthServices();
    const { changeData, deleteData, getData, messageText, setMessageText } = DataServices();

    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [inEdit, setInEdit] = useState<boolean>(false);

    const { data: userAccess, isLoading: userAccessLoad, error: userAccessError } = getData<UserIntrf>({
        api_url: `${import.meta.env.VITE_BASE_API_URL}/user/user-data/${currentUserId}`,
        query_key: [`current-user-${currentUserId}`],
        stale_time: 1800000,
    });

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
            queryClient.invalidateQueries({ queryKey: [`current-user-${currentUserId}`] });
            setInEdit(false);
        },
        onSettled: () => setIsProcessing(false)
    });

    const deleteUserDataMt = useMutation({
        onMutate: () => setIsProcessing(false),
        mutationFn: async () => {
            await deleteData(`${import.meta.env.VITE_BASE_API_URL}/user/remove/${currentUserId}`);
        },
        onError: () => {},
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`basic-calculator-data-${currentUserId}`] });
            queryClient.invalidateQueries({ queryKey: [`bmi-calculator-data-${currentUserId}`] });
            queryClient.invalidateQueries({ queryKey: [`current-user-${currentUserId}`] });
            signOut();
        },
        onSettled: () => setIsProcessing(false)
    });

    return { 
        changeUserDataMt, currentUserId, deleteUserDataMt, inEdit, isProcessing, messageText, 
        setInEdit, setIsProcessing, setMessageText, userAccess, userAccessError, userAccessLoad 
    }
}