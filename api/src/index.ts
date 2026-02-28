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

const app = express();

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: ['http://localhost:1999', 'http://localhost:5173']
}))

if (process.env.NODE_ENV !== 'production') {
    db.then(() => {
        app.listen(1999, () => console.log('api running at http://localhost:1999'))
    })
}