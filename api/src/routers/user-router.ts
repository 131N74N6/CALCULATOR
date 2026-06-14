import { Router } from "express";
import { changeCurrentUserData, deleteCurrentUser, getCurrentUserData } from "../controllers/user-controller";
import { checkOwnerShip, verifyToken } from "../middleware/auth-middleware";

const userRouters = Router();

userRouters.delete('/rm/:user_id', verifyToken, checkOwnerShip, deleteCurrentUser);
userRouters.get('/user-data', verifyToken, getCurrentUserData);
userRouters.put('/edit/:user_id', verifyToken, checkOwnerShip, changeCurrentUserData);

export default userRouters;