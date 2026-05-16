import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import AuthServices from "./auth.service";
import type { ChangeDataProps, GetDataIntrf, InfiniteScrollIntrf, InsettDataIntrf } from '../models/data.model';

export default function DataServices(pageName?: string) {
    const { authLoading, currentUserToken } = AuthServices();
    const [messageText, setMessageText] = useState<string | null>(null);

    async function changeData<T>(props: ChangeDataProps<T>) {
        try {
            const request = await fetch(props.api_url, {
                body: JSON.stringify(props.data),
                headers: {
                    'Authorization': `Bearer ${currentUserToken}`,
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
            });

            const response = await request.json();

            if (!request.ok) {
                setMessageText(response.message);
                throw new Error(response.message);
            } else {
                setMessageText(response);
                return response;
            }
        } catch (error: any) {
            setMessageText(error.message || 'Check Your Network Connection');
            throw error;
        }
    }

    async function deleteData(api_url: string) {
        try {
            const request = await fetch(api_url, {
                headers: {
                    'Authorization': `Bearer ${currentUserToken}`,
                    'Content-Type': 'application/json',
                },
                method: 'DELETE',
            });

            const response = await request.json();

            if (!request.ok) {
                setMessageText(response.message);
                throw new Error(response.message);
            } else {
                setMessageText(response.message);
                return response;
            }
        } catch (error: any) {
            setMessageText(error.message || 'Check your network connection')
            throw error;
        }
    }

    function getData<T>(props: GetDataIntrf) {
        const { data, error, isLoading } = useQuery<T, Error>({
            enabled: !!currentUserToken && !authLoading,
            queryFn: async () => {
                try {
                    const request = await fetch(props.api_url, {
                        headers: {
                            'Authorization': `Bearer ${currentUserToken}`,
                            'Content-Type': 'application/json'
                        },
                        method: 'GET'
                    });

                    const response = await request.json();

                    if (!request.ok) {
                        setMessageText(response.message);
                        throw new Error (response.message);
                    } else {
                        setMessageText(response);
                        return response;
                    }
                } catch (error: any) {
                    setMessageText(error.message || 'Check your network connection');
                    throw error;
                }
            },
            queryKey: props.query_key,
            refetchOnMount: true,
            refetchOnReconnect: true,
            refetchOnWindowFocus: false,
            staleTime: props.stale_time
        });

        return { data, error, isLoading }
    }
    
    function infiniteScroll<T>(props: InfiniteScrollIntrf) {
        async function fetchData({ pageParam = 1 }: { pageParam?: number }) {
            try {
                const request = await fetch(`${props.api_url}?page=${pageParam}&limit=${props.limit}`, {
                    headers: {
                        'Authorization': `Bearer ${currentUserToken}`,
                        'Content-Type': 'application/json'
                    },
                    method: 'GET'
                });
                
                const response = await request.json();

                if (!request.ok) {
                    setMessageText(response.message);
                    throw new Error(response.message);
                } else {
                    setMessageText(null);
                    return response;
                }
            } catch (error: any) {
                setMessageText(error.message || 'Check your network connection');
                throw error;
            }
        }

        const { 
            data, error, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading 
        } = useInfiniteQuery({
            enabled: !!currentUserToken && !authLoading,
            initialPageParam: 1,
            queryKey: props.query_key,
            queryFn: fetchData,
            getNextPageParam: (lastPage, allPages) => {
                if (lastPage.length < props.limit) return;
                return allPages.length + 1;
            },
            refetchOnMount: true,
            refetchOnReconnect: true,
            refetchOnWindowFocus: false,
            staleTime: props.stale_time,
        });

        const paginatedData: T[] = data ? data.pages.flat() : [];
        const isReachedEnd = !hasNextPage;
        const isLoadMore = isFetchingNextPage;

        return { error, fetchNextPage, isLoading, isLoadMore, isReachedEnd, paginatedData }
    }
    
    async function insertData<T>(props: InsettDataIntrf<T>) {
        try {
            const request = await fetch(props.api_url, {
                body: JSON.stringify(props.data),
                headers: {
                    'Authorization': `Bearer ${currentUserToken}`,
                    'Content-Type': 'application/json',
                },
                method: 'POST',
            });

            const response = await request.json();

            if (!request.ok) {
                setMessageText(response.message);
                throw new Error(response.message);
            } else {
                if (pageName === 'basic-calculator') {
                    setMessageText(null);
                    console.log(String(response.result));
                    return response;
                } else if (pageName === 'bmi-calculator') {
                    setMessageText(null);
                    console.log({ result: response.result, decision: response.decision });
                    return response;
                } else {
                    //
                }
            }
        } catch (error: any) {
            setMessageText(error.message || 'Check your network connection');
            throw error;
        }
    }

    return { changeData, messageText, deleteData, getData, infiniteScroll, insertData, setMessageText }
}