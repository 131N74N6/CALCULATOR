import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
    user?: { token: string; user_id: string }
}

interface JwtPayload {
    token: string; user_id: string
}

export async function checkOwnerShip(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const currentUserId = req.params.user_id;

        if (!req.user) return res.status(401).json({ message: 'authentication required' });
        if (!currentUserId) return res.status(400).json({ message: 'user id is required' });
        if (currentUserId !== req.user.user_id) return res.status(403).json({ message: 'access denied' });

        next();
    } catch (error) {
        res.status(500).json({ message: 'verifiction failed because internal server error' });
    }
}

export async function verifyToken(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const header = req.headers.authorization;
        if (!header || !header.startsWith('Bearer ')) return res.status(401).json({ message: 'token required' });

        const token = header.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || 'secret_key') as JwtPayload;

        req.user = { token: token, user_id: decoded.user_id };
        next();
    } catch (error) {
        res.status(500).json({ message: 'internal server error' });
    }
}