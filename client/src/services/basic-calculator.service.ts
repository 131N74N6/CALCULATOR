import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { BasicCalcIntrf, ExecutorIntrf } from "../models/basic-calculator.model";
import AuthServices from "./auth.service";
import DataServices from "./data.service";
import { useState } from "react";

export default function BasicCalculatorServices() {
    const queryClient = useQueryClient();
    const { currentUserId } = AuthServices();
    const { deleteData, infiniteScroll, insertData, messageText, setMessageText } = DataServices('basic-calculator');
    
    const [localResult, setLocalResult] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    const { error, fetchNextPage, isLoading, isLoadMore, isReachedEnd, paginatedData } = infiniteScroll<BasicCalcIntrf>({
        api_url: `${import.meta.env.VITE_BASE_API_URL}/basic-calculator/logs/${currentUserId}`,
        limit: 15,
        query_key: [`basic-calculator-data-${currentUserId}`],
        stale_time: 1800000
    });

    const deleteOneFromHistory = useMutation({
        onMutate: () => setIsProcessing(true),
        mutationFn: async (_id: string) => {
            await deleteData(`${import.meta.env.VITE_BASE_API_URL}/basic-calculator/rm/${_id}`)
        },
        onError: () => {},
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [`basic-calculator-data-${currentUserId}`] }),
        onSettled: () => setIsProcessing(false)
    });

    const deleteAllFromHistory = useMutation({
        onMutate: () => setIsProcessing(true),
        mutationFn: async () => {
            await deleteData(`${import.meta.env.VITE_BASE_API_URL}/basic-calculator/rm-all/${currentUserId}`)
        },
        onError: () => {},
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [`basic-calculator-data-${currentUserId}`] }),
        onSettled: () => setIsProcessing(false)
    });

    const executeFormula = useMutation({
        onMutate: () => setIsProcessing(true),
        mutationFn: async (formula: string) => {
            return await insertData<ExecutorIntrf>({
                api_url: `${import.meta.env.VITE_BASE_API_URL}/basic-calculator/execute`,
                data: {
                    created_at: new Date().toISOString(),
                    formula: formula,
                    user_id: currentUserId!
                }
            });
        },
        onError: () => {},
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: [`basic-calculator-data-${currentUserId}`] });
            setLocalResult(response.result);
        },
        onSettled: () => setIsProcessing(false)
    });

    const history = { error, fetchNextPage, isLoading, isLoadMore, isReachedEnd, paginatedData }

    return { 
        deleteOneFromHistory, deleteAllFromHistory, executeFormula, 
        history, isProcessing, localResult, setLocalResult, messageText, setIsProcessing,
        setMessageText
    }
}