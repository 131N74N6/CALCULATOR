import express from 'express';
import { deleteAllResults, deleteOneResult, getCurrentUserResult, insertNewFormula } from '../controllers/basic-controller';
import { checkOwnerShip, verifyToken } from '../middleware/auth.middleware';

const basicRouters = express.Router();

basicRouters.delete('/delete:_id', deleteOneResult);
basicRouters.delete('/deletes/:user_id', verifyToken, checkOwnerShip, deleteAllResults);
basicRouters.get('/get/:user_id', verifyToken, checkOwnerShip, getCurrentUserResult);
basicRouters.post('/insert', insertNewFormula);

export default basicRouters