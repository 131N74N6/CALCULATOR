export type BasicIntrf = {
    _id: string;
    created_at: string;
    formula: string;
    result: string;
    user_id: string;
}

export type BasicCalculatorServicesIntrf = {
    set_is_processing: (value: React.SetStateAction<boolean>) => void;
}