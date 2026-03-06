import express from 'express';
import { deleteAllBmiResults, deleteOneBmiResult, getCurrentUserBmiResults, insertNewBmi } from '../controllers/bmi-controller';
import { checkOwnerShip, verifyToken } from '../middleware/auth.middleware';

const bmiRouters = express.Router();

bmiRouters.delete('/delete/_id', deleteOneBmiResult);
bmiRouters.delete('/deletes/:user_id', verifyToken, checkOwnerShip, deleteAllBmiResults);
bmiRouters.get('get/:user_id', verifyToken, checkOwnerShip, getCurrentUserBmiResults);
bmiRouters.post('/insert', insertNewBmi);

export default bmiRouters;