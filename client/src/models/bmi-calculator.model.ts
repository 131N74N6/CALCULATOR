import type { FetchNextPageOptions, InfiniteData, InfiniteQueryObserverResult, UseMutationResult } from "@tanstack/react-query";

export type BmiIntrf = {
    _id: string;
    created_at: string;
    height: number;
    result: number;
    weight: number;
    decision: string
    user_id: string;
}

export type BmiExecutorIntrf = {
    _id: string;
    created_at: string;
    height: number;
    weight: number;
    user_id: string;
}

export type BmiCalcItemIntrf = {
    bmi_calc_log: BmiIntrf;
    is_processing: boolean;
    on_delete: UseMutationResult<void, Error, string, void>;
}

export type BmiCalcListIntrf = {
    bmi_calc_logs: BmiIntrf[];
    fetch_next_page: (options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverResult<InfiniteData<any, unknown>, Error>>;
    is_fetch_next_page: boolean;
    is_processing: boolean;
    is_reached_end: boolean;
    on_delete: UseMutationResult<void, Error, string, void>;
}

export type BmiResultIntrf = {
    result: string; 
    decision: string;
}