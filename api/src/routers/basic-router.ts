import express from 'express';
import { deleteAllResults, deleteOneResult, getCurrentUserResult, insertNewFormula } from '../controllers/basic-controller';

const basicRouters = express.Router();

basicRouters.delete('/delete:_id', deleteOneResult);
basicRouters.delete('/delete-all/:user_id', deleteAllResults);
basicRouters.get('/get/:user_id', getCurrentUserResult);
basicRouters.post('/insert', insertNewFormula);

export default basicRouters