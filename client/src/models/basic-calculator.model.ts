export type BasicIntrf = {
    _id: string;
    created_at: string;
    formula: string;
    result: string;
    user_id: string;
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