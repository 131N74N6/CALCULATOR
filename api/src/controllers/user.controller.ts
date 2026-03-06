import { Request, Response } from 'express';
import { Auth } from '../models/user-model';
import { Basic } from '../models/basic-model';
import { BMI } from '../models/bmi-model';

export async function changeCurrentUserData(req: Request, res: Response) {
    try {
        await Auth.updateOne({ _id: req.params.user_id }, {
            $set: {
                email: req.body.email,
                username: req.body.username
            }
        });
        res.status(200).json({ message: 'user data has changed' });
    } catch (error) {
        res.status(500).json({ message: 'internal server error' });
    }
}

export async function deleteCurrentUser(req: Request, res: Response) {
    try {
        await Basic.deleteMany({ user_id: req.params.user_id });
        await BMI.deleteMany({ user_id: req.params.user_id });
        await Auth.deleteOne({ _id: req.params.user_id });
        res.status(200).json({ message: 'this user has deleted the account' });
    } catch (error) {
        res.status(500).json({ message: 'internal server error' });
    }
}

export async function getCurrentUserData(req: Request, res: Response) {
    try {
        const getUser = await Auth.find({ _id: req.params.user_id }, { password: 0 });
        res.status(200).json({
            created_at: getUser[0].created_at,
            email: getUser[0].email,
            user_id: getUser[0]._id,
            username: getUser[0].username
        });
    } catch (error) {
        res.status(500).json({ message: 'internal server error' });
    }
}