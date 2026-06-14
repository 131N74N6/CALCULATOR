import type { FetchNextPageOptions, InfiniteData, InfiniteQueryObserverResult, UseMutationResult } from "@tanstack/react-query";

export type IpV4Intrf = {
    _id: string;
    created_at: string;
    stats: {
        ipv4: {
            binary: string;
            decimal: string;
        };
        net_mask: {
            binary: string;
            decimal: string;
        };
        network_ip: {
            binary: string;
            decimal: string;
        };
        first_host_ip: {
            binary: string;
            decimal: string;
        };
        last_host_ip: {
            binary: string;
            decimal: string;
        };
        broadcast_ip: {
            binary: string;
            decimal: string;
        };
    };
    user_id: string;
}

export type IpV4ExecutorIntrf = {
    _id: string;
    created_at: string;
    net_mask: string;
    slot_1: string; 
    slot_2: string; 
    slot_3: string; 
    slot_4: string;
}

export type IpV4Item = {
    ipv4_log: IpV4Intrf;
    is_processing: boolean;
    on_delete: UseMutationResult<void, Error, string, void>;
}

export type IpV4List = {
    ipv4_logs: IpV4Intrf[];
    fetch_next_page: (options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverResult<InfiniteData<any, unknown>, Error>>;
    is_fetch_next_page: boolean;
    is_processing: boolean;
    is_reached_end: boolean;
    on_delete: UseMutationResult<void, Error, string, void>;
}

export type IpV4ResultIntrf = {
    ipv4: string;
    binary_ipv4: string;
    net_mask: string;
    binary_net_mask: string;
    network_ip: string;
    binary_network_ip: string;
    first_host_ip: string;
    binary_first_host_ip: string;
    last_host_ip: string;
    binary_last_host_ip: string;
    broadcast_ip: string;
    binary_broadcast_ip: string;
}