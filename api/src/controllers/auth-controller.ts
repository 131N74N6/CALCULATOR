import { Request, Response } from 'express';
import { Auth } from '../models/auth-model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function signIn(req: Request, res: Response) {
    try {
        const { password, username } = req.body;
        const userFound = await Auth.find({ username: username });

        if (!password || !username) {
            return res.status(400).json({ message: 'all fields are required' });
        }
        if (!password) {
            return res.status(400).json({ message: 'password is required' });
        }
        if (!username) {
            return res.status(400).json({ message: 'username is required' });
        }
        if (!userFound) {
            return res.status(404).json({ message: 'invalid username or username not found' });
        }

        const isPasswordMatch = await bcrypt.compare(password, userFound[0].password);

        if (!isPasswordMatch) {
            return res.status(404).json({ message: 'invalid password' });
        }

        const token = jwt.sign(
            { id: userFound[0]._id, username: userFound[0].username },
            process.env.JWT_SECRET_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODE4Y2RlZjFjMjdkZGE3ZDQxMzQ2MyIsInVzZXJuYW1lIjoiYmludGFuZyJ9.2CYKkbNWb3IeEJtv2sMlO3Q1fJIuflYiE60nLDQXc-c'
        );

        res.status(200).json({
            status: 'ok', token: token, id: userFound[0]._id, username: userFound[0].username
        });
    } catch (error) {
        res.status(500).json({ message: 'internal server error' });
    }
}

export async function signUp(req: Request, res: Response) {
    try {
        const { created_at, email, password, username } = req.body;
        const userFound = await Auth.find({ username: username });
    
        if (!created_at || !email || !password || !username) {
            return res.status(400).json({ message: 'all fields are required' });
        }
        if (!email) {
            return res.status(400).json({ message: 'email is required' });
        }
        if (!password) {
            return res.status(400).json({ message: 'password is required' });
        }
        if (!username) {
            return res.status(400).json({ message: 'username is required' });
        }
        if (userFound) {
            return res.status(400).json({ message: 'this username already exist' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Auth({ created_at, email, password: hashedPassword, username });
        await newUser.save();
    } catch (error) {
        res.status(500).json({ message: 'internal server error' })
    }
}