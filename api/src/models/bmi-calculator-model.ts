import mongoose, { Schema, Types } from "mongoose";

export type BMIIntrf = {
    created_at: string;
    decision: string;
    height: number;
    weight: number;
    result: number;
    user_id: Types.ObjectId;
}

const bmiSchema = new Schema<BMIIntrf>({
    created_at: { type: String, required: true },
    decision: { type: String, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    result: { type: Number, required: true },
    user_id: { type: Schema.Types.ObjectId, required: true }
});

export const BMI = mongoose.model<BMIIntrf>('bmi', bmiSchema, 'bmi');