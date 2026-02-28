import express from 'express';
import { deleteAllBmiResults, deleteOneBmiResult, getCurrentUserBmiResults, insertNewBmi } from '../controllers/bmi-controller';

const bmiRouters = express.Router();

bmiRouters.delete('/delete/_id', deleteOneBmiResult);
bmiRouters.delete('/delete-all/:user_id', deleteAllBmiResults);
bmiRouters.get('get/:user_id', getCurrentUserBmiResults);
bmiRouters.post('/insert', insertNewBmi);

export default bmiRouters;