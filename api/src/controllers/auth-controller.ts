import { Request, Response } from 'express';
import { Auth } from '../models/user-model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function signIn(req: Request, res: Response) {
    try {
        const { password, username } = req.body;
        
        if (!password && !username) return res.status(400).json({ message: 'all fields are required' });
        if (!password) return res.status(400).json({ message: 'password is required' });
        if (!username) return res.status(400).json({ message: 'username is required' });
        
        const userFound = await Auth.findOne({ username: username });
        if (!userFound) return res.status(404).json({ message: 'username not found' });
        
        const isPasswordMatch = await bcrypt.compare(password, userFound.password);
        if (!isPasswordMatch)  return res.status(404).json({ message: 'invalid password' });

        const token = jwt.sign(
            { user_id: userFound._id.toString(), username: userFound.username },
            process.env.JWT_SECRET_KEY || 'secret_key',
            { expiresIn: '1d'}
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).json({ user_id: userFound._id, username: userFound.username });
    } catch (error: any) {
        res.status(500).json({ message: 'internal server error' });
    }
}

export async function signUp(req: Request, res: Response) {
    try {
        const { created_at, email, password, username } = req.body;
        const userFound = await Auth.findOne({ username: username });
        if (userFound) return res.status(400).json({ message: 'this username already exist' });

        const findEmail = await Auth.findOne({ email: email });
        if (findEmail) return res.status(400).send({ message: 'this email already exist' });
    
        if (!created_at && !email && !password && !username) return res.status(400).json({ message: 'all fields are required' });
        if (!email) return res.status(400).json({ message: 'email is required' });
        if (!password) return res.status(400).json({ message: 'password is required' });
        if (!username) return res.status(400).json({ message: 'username is required' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Auth({ created_at, email, password: hashedPassword, username });
        
        await newUser.save();
        res.status(200).json({ message: 'new user added' });
    } catch (error) {
        res.status(500).json({ message: 'internal server error' });
    }
}

export async function logOut(_: Request, res: Response) {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production'
        });

        res.status(200).json({ message: 'user has been logged out' });
    } catch (error: any) {
        res.status(500).json({ message: 'internal server error' });
    }
}