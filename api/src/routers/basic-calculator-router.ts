import express from 'express';
import { deleteAllResults, deleteOneResult, getCurrentUserResult, insertNewFormula } from '../controllers/basic-calculator-controller';
import { checkOwnerShip, verifyToken } from '../middleware/auth-middleware';

const basicRouters = express.Router();

basicRouters.delete('/rm/:_id', deleteOneResult);
basicRouters.delete('/rm-all/:user_id', verifyToken, checkOwnerShip, deleteAllResults);

basicRouters.get('/logs/:user_id', verifyToken, checkOwnerShip, getCurrentUserResult);

basicRouters.post('/execute', insertNewFormula);

export default basicRouters