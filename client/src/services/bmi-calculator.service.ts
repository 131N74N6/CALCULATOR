import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { BmiIntrf, BmiExecutorIntrf, BmiResultIntrf } from "../models/bmi-calculator.model";
import AuthServices from "./auth.service";
import DataServices from "./data.service";
import { useState } from "react";

export default function BmiCalculatorServices() {
    const queryClient = useQueryClient();
    const { currentUserId } = AuthServices();
    const { deleteData, infiniteScroll, insertData, messageText, setMessageText } = DataServices('bmi-calculator');

    const [localResult, setLocalResult] = useState<BmiResultIntrf | null>(null);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    const { error, fetchNextPage, isLoading, isLoadMore, isReachedEnd, paginatedData } = infiniteScroll<BmiIntrf>({
        api_url: `${import.meta.env.VITE_BASE_API_URL}/bmi-calculator/logs/${currentUserId}`,
        limit: 15,
        query_key: [`bmi-calculator-data-${currentUserId}`],
        stale_time: 1800000
    });

    const deleteOneFromHistory = useMutation({
        onMutate: () => setIsProcessing(true),
        mutationFn: async (_id: string) => {
            await deleteData(`${import.meta.env.VITE_BASE_API_URL}/bmi-calculator/rm/${_id}`)
        },
        onError: () => {},
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [`bmi-calculator-data-${currentUserId}`] }),
        onSettled: () => setIsProcessing(false)
    });

    const deleteAllFromHistory = useMutation({
        onMutate: () => setIsProcessing(true),
        mutationFn: async () => {
            return await deleteData(`${import.meta.env.VITE_BASE_API_URL}/bmi-calculator/rm-all/${currentUserId}`)
        },
        onError: () => {},
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [`bmi-calculator-data-${currentUserId}`] }),
        onSettled: () => setIsProcessing(false)
    });

    const executeFormula = useMutation({
        onMutate: () => setIsProcessing(true),
        mutationFn: async ({ height, weight }: { height: number; weight: number }) => {
            return await insertData<BmiExecutorIntrf>({
                api_url: `${import.meta.env.VITE_BASE_API_URL}/bmi-calculator/execute`,
                data: {
                    created_at: new Date().toISOString(),
                    height: height,
                    weight: weight,
                    user_id: currentUserId!
                }
            });
        },
        onError: () => {},
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: [`bmi-calculator-data-${currentUserId}`] });
            setLocalResult({
                decision: response.decision, 
                result: response.result.toString()
            });
        },
        onSettled: () => setIsProcessing(false)
    });

    const history = { error, fetchNextPage, isLoading, isLoadMore, isReachedEnd, paginatedData }

    return { 
        deleteOneFromHistory, deleteAllFromHistory, executeFormula, history, 
        isProcessing, localResult, setIsProcessing, setLocalResult, messageText, 
        setMessageText 
    }
}