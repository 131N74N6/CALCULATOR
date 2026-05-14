export type BmiIntrf = {
    _id: string;
    created_at: string;
    height: number;
    result: number;
    weight: number;
    user_id: string;
}

export type BmiExecutorIntrf = {
    _id: string;
    created_at: string;
    height: number;
    weight: number;
    user_id: string;
}

export type BmiResultIntrf = {
    result: string; 
    decision: string;
}