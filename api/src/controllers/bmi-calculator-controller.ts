import { Request, Response } from 'express';
import { BMI } from '../models/bmi-calculator-model';

export async function deleteAllBmiResults(req: Request, res: Response) {
    try {
        const logs = await BMI.find({ user_id: req.params.user_id }).countDocuments();
        if (logs === 0) return res.status(400).json({ message: 'Logs not found' });
        
        await BMI.deleteMany({ user_id: req.params.user_id });
        res.status(200).json({ message: 'all results deleted' });
    } catch (error) {
        res.status(500).json({ message: 'internal server error' });
    }
}

export async function deleteOneBmiResult(req: Request, res: Response) {
    try {
        await BMI.deleteOne({ _id: req.params._id });
        res.status(200).json({ message: 'all results deleted' });
    } catch (error) {
        res.status(500).json({ message: 'internal server error' });
    }
}

export async function getCurrentUserBmiResults(req: Request, res: Response) {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 20;
        const skip = (page - 1) * limit;

        const getData = await BMI.find({ user_id: req.params.user_id }).limit(limit).skip(skip).sort({ created_at: -1 });
        res.status(200).json(getData);
    } catch (error) {
        res.status(500).json({ message: 'internal server error' });
    }
}

export async function insertNewBmi(req: Request, res: Response) {
    
    try {
        let decision: string;
        if (!req.body.height || !req.body.weight) res.status(400).json({ message: 'all input fields are required' });
        const result = Math.round((req.body.weight / ((req.body.height / 100) ** 2)));
        
        if (result >= 30) decision = 'Obesity (obesitas)';
        else if (result >= 25 && result <= 29.5) decision = 'Overweight (Berlebihan)';
        else if (result >= 18.5 && result <= 24.9) decision = 'Normal';
        else decision = 'Underweight (Kurus)';
        
        const newCondition = new BMI({ 
            created_at: req.body.created_at,
            decision, 
            height: req.body.height, 
            result, 
            weight: req.body.weight,
            user_id: req.body.user_id
        });

        await newCondition.save();
        res.status(200).json({ result, decision });
    } catch (error) {
        res.status(500).json({ message: 'internal server error' });
    }
}