import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { IpV4ExecutorIntrf, IpV4Intrf, IpV4ResultIntrf } from "../models/ipv4-calculator-model";
import AuthServices from "./auth.service";
import DataServices from "./data.service";
import { useState } from "react";

export default function Ipv4CalculatorServices() {
    const queryClient = useQueryClient();
    const { currentUserId } = AuthServices();
    const { deleteData, infiniteScroll, insertData, messageText, setMessageText } = DataServices('ipv4-calculator');
    
    const [localResult, setLocalResult] = useState<IpV4ResultIntrf | null>(null);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [ipV4, setIpV4] = useState({ 
        firstSlot: "", secondSlot: "", thirdSlot: "", fourthSlot: "", netMask: "" 
    });

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setIpV4((ip) => { return { ...ip, [name]: value} } );
    }

    const resetOperation = () => {
        setIpV4({ firstSlot: "", secondSlot: "", thirdSlot: "", fourthSlot: "", netMask: "" });
        setLocalResult(null);
    }

    const deleteOneFromHistory = useMutation({
        onMutate: () => setIsProcessing(true),
        mutationFn: async (id: string) => {
            await deleteData(`${import.meta.env.VITE_BASE_API_URL}/ipv4-calculator/rm/${id}`)
        },
        onError: () => {},
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [`ipv4-calculator-logs-${currentUserId}`] }),
        onSettled: () => setIsProcessing(false)
    });

    const deleteAllFromHistory = useMutation({
        onMutate: () => setIsProcessing(true),
        mutationFn: async () => {
            return await deleteData(`${import.meta.env.VITE_BASE_API_URL}/ipv4-calculator/rm-all/${currentUserId}`)
        },
        onError: (response) => {
            setMessageText(response.message || 'Check your internet connection');
        },
        onSuccess: (response) => {
            setMessageText(response.message);
            queryClient.invalidateQueries({ queryKey: [`ipv4-calculator-logs-${currentUserId}`] });
        },
        onSettled: () => setIsProcessing(false)
    });

    const executeFormula = useMutation({
        onMutate: () => setIsProcessing(true),
        mutationFn: async () => {
            return await insertData<IpV4ExecutorIntrf>({
                api_url: `${import.meta.env.VITE_BASE_API_URL}/ipv4-calculator/execute`,
                data: {
                    created_at: new Date().toISOString(),
                    net_mask: ipV4.netMask.trim(),
                    slot_1: ipV4.firstSlot.trim(),
                    slot_2: ipV4.secondSlot.trim(),
                    slot_3: ipV4.thirdSlot.trim(),
                    slot_4: ipV4.fourthSlot.trim(),
                }
            });
        },
        onError: (response) => {
            setMessageText(response.message || 'Check your internet connection');
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: [`ipv4-calculator-logs-${currentUserId}`] });
            setLocalResult({
                ipv4: response.ipv4,
                binary_ipv4: response.binary_ipv4,
                net_mask: response.net_mask,
                binary_net_mask: response.binary_net_mask,
                network_ip: response.network_ip,
                binary_network_ip: response.binary_network_ip,
                first_host_ip: response.first_host_ip,
                binary_first_host_ip: response.binary_first_host_ip,
                last_host_ip: response.last_host_ip,
                binary_last_host_ip: response.binary_last_host_ip,
                broadcast_ip: response.broadcast_ip,
                binary_broadcast_ip: response.binary_broadcast_ip
            });
        },
        onSettled: () => setIsProcessing(false)
    });

    const { error, fetchNextPage, isLoading, isLoadMore, isReachedEnd, paginatedData } = infiniteScroll<IpV4Intrf>({
        api_url: `${import.meta.env.VITE_BASE_API_URL}/ipv4-calculator/logs`,
        limit: 16,
        query_key: [`ipv4-calculator-logs-${currentUserId}`],
        stale_time: 1800000
    });

    const ipV4Logs = { error, fetchNextPage, isLoading, isLoadMore, isReachedEnd, paginatedData };

    function calculate(event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) {
        event.preventDefault();
        executeFormula.mutate();
    }

    return { 
        calculate, currentUserId, deleteAllFromHistory, deleteOneFromHistory, executeFormula, handleInput, ipV4, 
        ipV4Logs, isProcessing, localResult, messageText, resetOperation, setLocalResult, setMessageText 
    }
}
