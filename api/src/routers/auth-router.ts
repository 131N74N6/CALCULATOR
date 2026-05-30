import express from 'express';
import { logOut, signIn, signUp } from '../controllers/auth-controller';

const authRouters = express.Router();

authRouters.post('/log-out', logOut);
authRouters.post('/sign-in', signIn);
authRouters.post('/sign-up', signUp);

export default authRouters;