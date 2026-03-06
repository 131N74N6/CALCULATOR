export type UserAccessIntrf = {
    token: string;
    user_id: string;
}

export type UserIntrf = {
    created_at: string;
    email: string;
    user_id: string;
    username: string;
}

export type SignInIntrf = {
    password: string;
    username: string;
    navigate_to: (path: string) => void;
}

export type SignUpIntrf = {
    created_at: string;
    email: string;
    password: string;
    username: string;
    navigate_to: (path: string) => void;
}