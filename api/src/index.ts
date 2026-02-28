import dns from 'node:dns/promises'
import dotenv from 'dotenv';

dotenv.config();

if (process.env.NODE_ENV !== 'production') {
    dns.setServers(["1.1.1.1", "8.8.8.8"]);
    console.log('DNS servers set to Cloudflare (1.1.1.1) and Google (8.8.8.8)');
}

import express from 'express';
import cors from 'cors';
import { db } from './database/mongodb';
import basicRouters from './routers/basic-router';
import bmiRouters from './routers/bmi-router';
import authRouters from './routers/auth-router';

const app = express();

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: [
        'http://localhost:6661', 
        'http://localhost:5173'
    ]
}));
app.use('/api/auth', authRouters);
app.use('/api/basic-calculator', basicRouters);
app.use('/api/bmi-calculator', bmiRouters);

if (process.env.NODE_ENV !== 'production') {
    db.then(() => {
        app.listen(6661, () => console.log('api running at http://localhost:6661'))
    });
}

export default app;