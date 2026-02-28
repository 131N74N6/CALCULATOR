import { Request, Response } from 'express';
import { BMI } from '../models/bmi-model';

export async function deleteAllBmiResults(req: Request, res: Response) {
    try {
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

        const getData = await BMI.find({ user_id: req.params.user_id });
        res.status(200).json(getData);
    } catch (error) {
        res.status(500).json({ message: 'internal server error' });
    }
}

export async function insertNewBmi(req: Request, res: Response) {
    const { height, weight } = req.body;
    if (!height || !weight) res.status(400).json({ message: 'all input fields are required' });

    try {
        let decision;
        const result = (weight / ((height / 100) ** 2));
        res.status(200).json({ message: 'new formula added' });
    } catch (error) {
        res.status(500).json({ message: 'internal server error' });
    }
}