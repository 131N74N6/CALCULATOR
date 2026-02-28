import mongoose, { Schema, Types } from "mongoose";

export type BMIIntrf = {
    height: number;
    weight: number;
    result: string;
    decision: string;
    user_id: Types.ObjectId;
}

const bmiSchema = new Schema<BMIIntrf>({
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    result: { type: String, required: true },
    decision: { type: String, required: true },
    user_id: { type: Schema.Types.ObjectId, required: true }
});

export const BMI = mongoose.model<BMIIntrf>('bmi', bmiSchema, 'bmi');