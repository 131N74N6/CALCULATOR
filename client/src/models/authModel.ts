export type UserIntrf = {
    status: string;
    token: string;
    id: string;
    username: string;
}

export type SignInIntrf = {
    password: string;
    username: string;
}

export type SignUpIntrf = {
    created_at: string;
    email: string;
    password: string;
    username: string;
}