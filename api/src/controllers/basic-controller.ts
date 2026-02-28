import { Request, Response } from 'express';
import { Basic } from '../models/basic-model';
import { evaluate } from 'mathjs';

export async function deleteAllResults(req: Request, res: Response) {
    try {
        await Basic.deleteMany({ user_id: req.params.user_id });
        res.status(200).json({ message: 'all results deleted' });
    } catch (error) {
        res.status(500).json({ message: 'internal server error' });
    }
}

export async function deleteOneResult(req: Request, res: Response) {
    try {
        await Basic.deleteOne({ _id: req.params._id });
        res.status(200).json({ message: 'one result deleted' });
    } catch (error) {
        res.status(500).json({ message: 'internal server error' });
    }
}

export async function getCurrentUserResult(req: Request, res: Response) {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 20;
        const skip = (page - 1) * limit;

        const getData = await Basic.find({ user_id: req.params.user_id }).limit(limit).skip(skip);
        res.status(200).json(getData);
    } catch (error) {
        res.status(500).json({ message: 'internal server error' });
    }
}

export async function insertNewFormula(req: Request, res: Response) {
    const { created_at, formula, user_id } = req.body;

    if (!created_at || !formula || !user_id) return res.status(400).json({ message: 'all input fields are required' });

    try {
        const result = evaluate(formula);
        const newFormula = new Basic({ created_at, formula, result: result.toString(), user_id });
        await newFormula.save();
        res.status(200).json({ formula, result });
    } catch (error) {
        res.status(500).json({ message: 'internal server error' });
    }
}