import type { FetchNextPageOptions, InfiniteData, InfiniteQueryObserverResult, UseMutationResult } from "@tanstack/react-query";

export type BasicCalcIntrf = {
    _id: string;
    created_at: string;
    formula: string;
    result: string;
    user_id: string;
}

export type BasicCalcItemIntrf = {
    basic_calc_log: BasicCalcIntrf;
    is_processing: boolean;
    on_delete: UseMutationResult<void, Error, string, void>;
}

export type BasicCalcListIntrf = {
    basic_calc_logs: BasicCalcIntrf[];
    fetch_next_page: (options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverResult<InfiniteData<any, unknown>, Error>>;
    is_fetch_next_page: boolean;
    is_processing: boolean;
    is_reached_end: boolean;
    on_delete: UseMutationResult<void, Error, string, void>;
}

export type ExecutorIntrf = {
    _id: string;
    created_at: string;
    formula: string;
    user_id: string;
}

export type BasicCalcResult = {
    formula: string; 
    result: string;
}