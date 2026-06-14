import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import AuthServices from "./auth.service";
import type { ChangeDataProps, GetDataIntrf, InfiniteScrollIntrf, InsettDataIntrf } from '../models/data.model';

export default function DataServices(pageName?: string) {
    const { authLoading, currentUserId } = AuthServices();
    const [messageText, setMessageText] = useState<string | null>(null);

    async function changeData<T>(props: ChangeDataProps<T>) {
        try {
            const request = await fetch(props.api_url, {
                credentials: 'include',
                body: JSON.stringify(props.data),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
            });

            const response = await request.json();

            if (!request.ok) {
                const errorMessage = response.message || 'Failed to change data. Try again later';
                throw new Error(errorMessage);
            } else {
                return response;
            }
        } catch (error: any) {
            throw error;
        }
    }

    async function deleteData(api_url: string) {
        try {
            const request = await fetch(api_url, {
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'DELETE',
            });

            const response = await request.json();

            if (!request.ok) {
                const errorMessage = response.message || 'Failed to delete data. Try again later';
                throw new Error(errorMessage);
            } else {
                return response;
            }
        } catch (error: any) {
            throw error;
        }
    }

    function getData<T>(props: GetDataIntrf) {
        const { data, error, isLoading } = useQuery<T, Error>({
            enabled: !!currentUserId && !authLoading,
            queryFn: async () => {
                try {
                    const request = await fetch(props.api_url, {
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: 'GET'
                    });

                    const response = await request.json();

                    if (!request.ok) {
                        const errorMessage = response.message || 'Failed to get data. Try again later';
                        throw new Error(errorMessage);
                    } else {
                        return response;
                    }
                } catch (error: any) {
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
        const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
            enabled: !!currentUserId && !authLoading,
            initialPageParam: 1,
            queryKey: props.query_key,
            queryFn: async ({ pageParam = 1 }: { pageParam?: number }) => {
                try {
                    const request = await fetch(`${props.api_url}?page=${pageParam}&limit=${props.limit}`, {
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: 'GET'
                    });
                    
                    const response = await request.json();

                    if (!request.ok) {
                        const errorMessage = response.message || 'Failed to get data. Try again later';
                        throw new Error(errorMessage);
                    } else {
                        return response;
                    }
                } catch (error: any) {
                    throw error;
                }
            },
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
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
            });

            const response = await request.json();

            if (!request.ok) {
                const errorMessage = response.message || 'Failed to input data. Try again later';
                throw new Error(errorMessage);
            } else {
                if (pageName === 'basic-calculator') {
                    return response;
                } else if (pageName === 'bmi-calculator') {
                    return response;
                } else if (pageName === 'ipv4-calculator') {
                    return response;
                } else {
                    //
                }
            }
        } catch (error: any) {
            throw error;
        }
    }

    return { changeData, messageText, deleteData, getData, infiniteScroll, insertData, setMessageText }
}