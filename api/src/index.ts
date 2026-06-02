import dns from 'node:dns/promises'
import dotenv from 'dotenv';

dotenv.config();

if (process.env.NODE_ENV !== 'production') {
    dns.setServers(["1.1.1.1", "8.8.8.8"]);
    console.log('DNS servers set to Cloudflare (1.1.1.1) and Google (8.8.8.8)');
}

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import basicRouters from './routers/basic-calculator-router';
import bmiRouters from './routers/bmi-calculator-router';
import authRouters from './routers/auth-router';
import userRoutes from './routers/user-router';
import cookieParser from 'cookie-parser';

const app = express();

app.use(async (_: Request, __: Response, next: NextFunction) => {
    mongoose.connect((`${process.env.MONGODB_URL}`))
    .then(res => {
        if (res) console.log('Database connection succeffully');
    }).catch(err => {
        console.log("Database connection check failed:", err);
    });
    next();
});

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: [
        'http://localhost:6661', 
        'http://localhost:5173', 
        'https://my-calculator-be.vercel.app', 
        'https://my-calculator-ten-omega.vercel.app'
    ]
}));
app.use('/api/auth', authRouters);
app.use('/api/basic-calculator', basicRouters);
app.use('/api/bmi-calculator', bmiRouters);
app.use('/api/user', userRoutes);

if (process.env.NODE_ENV !== 'production') {
    app.listen(6661, () => console.log('api running at http://localhost:6661'));
}

export default app;