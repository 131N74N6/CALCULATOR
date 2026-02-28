import mongoose, { Schema, Types } from "mongoose";

export type BasicIntrf = {
    created_at: string;
    formula: string;
    result: string;
    user_id: Types.ObjectId;
}

const basicSchema = new Schema<BasicIntrf>({
    created_at: { type: String, required: true },
    formula: { type: String, required: true },
    result: { type: String, required: true },
    user_id: { type: Schema.Types.ObjectId, required: true }
});

export const Basic = mongoose.model<BasicIntrf>('basic', basicSchema, 'basic');