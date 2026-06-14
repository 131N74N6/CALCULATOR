import dns from 'node:dns/promises';
import dotenv from 'dotenv';

dotenv.config();

if (process.env.NODE_ENV !== 'production') {
    dns.setServers(["1.1.1.1", "8.8.8.8"]);
    console.log('DNS servers set to Cloudflare (1.1.1.1) and Google (8.8.8.8)');
}

import express from 'express';
import cors from 'cors';
import { connection } from './mongodb/connection';
import basicRouters from './routers/basic-calculator-router';
import bmiRouters from './routers/bmi-calculator-router';
import authRouters from './routers/auth-router';
import userRouters from './routers/user-router';
import cookieParser from 'cookie-parser';
import ipV4Routers from './routers/ipv4-calculator-router';

const app = express();

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
app.use('/api/ipv4-calculator', ipV4Routers);
app.use('/api/user', userRouters);

if (process.env.NODE_ENV !== 'production') {
    connection.then(() => {
        app.listen(6661, () => console.log('api running at http://localhost:6661'));
    });
}

export default app;