import express from 'express';
import { deleteAllBmiResults, deleteOneBmiResult, getCurrentUserBmiResults, insertNewBmi } from '../controllers/bmi-calculator-controller';
import { checkOwnerShip, verifyToken } from '../middleware/auth-middleware';

const bmiRouters = express.Router();

bmiRouters.delete('/rm/:_id', deleteOneBmiResult);
bmiRouters.delete('/rm-all/:user_id', verifyToken, checkOwnerShip, deleteAllBmiResults);

bmiRouters.get('/logs/:user_id', verifyToken, checkOwnerShip, getCurrentUserBmiResults);

bmiRouters.post('/execute', insertNewBmi);

export default bmiRouters;