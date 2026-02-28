import mongoose, { Schema } from "mongoose";

export type AuthIntrf = {
    created_at: string;
    email: string;
    password: string;
    username: string;
    profile_pict: string
}

const authSchema = new Schema<AuthIntrf>({
    created_at: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    profile_pict: { type: String }
});

export const Auth = mongoose.model('users', authSchema, 'users');