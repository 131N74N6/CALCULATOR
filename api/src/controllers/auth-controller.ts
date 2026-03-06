import { Request, Response } from 'express';
import { Auth } from '../models/user-model';
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
            { user_id: userFound[0]._id.toString() },
            process.env.JWT_SECRET_KEY || 'secret_key'
        );

        res.status(200).json({
            token: token, user_id: userFound[0]._id
        });
    } catch (error) {
        res.status(500).json({ message: 'internal server error' });
    }
}

export async function signUp(req: Request, res: Response) {
    try {
        const { created_at, email, password, username } = req.body;
        const userFound = await Auth.findOne({ username: username });
        const findEmail = await Auth.findOne({ email: email });
    
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
        if (findEmail) {
            return res.status(400).send({ message: 'this email already exist' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Auth({ created_at, email, password: hashedPassword, username });
        await newUser.save();
        
        res.status(200).json({ message: 'new user added' });
    } catch (error) {
        res.status(500).json({ message: 'internal server error' })
    }
}