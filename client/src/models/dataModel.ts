export type ChangeDataProps<A> = {
    api_url: string;
    data: Partial<Omit<A, '_id'>>;
}

export type GetDataIntrf = {
    api_url: string;
    query_key: string[];
    stale_time: number;
}

export type InfiniteScrollIntrf = {
    api_url: string;
    limit: number;
    query_key: string[];
    stale_time: number;
}

export type InsettDataIntrf<Y> = {
    api_url: string;
    data: Omit<Y, '_id'>;
}