import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { BasicCalculatorServicesIntrf, BasicIntrf } from "../models/basicModel";
import AuthServices from "./authService";
import DataServices from "./dataService";

export default function BasicCalculatorServices(props: BasicCalculatorServicesIntrf) {
    const queryClient = useQueryClient();
    const { currentUserId } = AuthServices();
    const { deleteData, infiniteScroll } = DataServices();

    const { error, fetchNextPage, isLoading, isLoadMore, isReachedEnd, paginatedData } = infiniteScroll<BasicIntrf>({
        api_url: `${import.meta.env.VITE_BASE_API_URL}/basic-calculator/get/${currentUserId}`,
        limit: 15,
        query_key: [`basic-calculator-data-${currentUserId}`],
        stale_time: 1800000
    });

    const deleteOneFromHistory = useMutation({
        onMutate: () => props.set_is_processing(true),
        mutationFn: async (_id: string) => {
            await deleteData(`${import.meta.env.VITE_BASE_API_URL}/basic-calculator/delete/${_id}`)
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [`basic-calculator-data-${currentUserId}`] }),
        onSettled: () => props.set_is_processing(false)
    });

    const deleteAllFromHistory = useMutation({
        onMutate: () => props.set_is_processing(true),
        mutationFn: async () => {
            await deleteData(`${import.meta.env.VITE_BASE_API_URL}/basic-calculator/deletes/${currentUserId}`)
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [`basic-calculator-data-${currentUserId}`] }),
        onSettled: () => props.set_is_processing(false)
    });

    const history = { error, fetchNextPage, isLoading, isLoadMore, isReachedEnd, paginatedData }

    return { deleteOneFromHistory, deleteAllFromHistory, history }
}