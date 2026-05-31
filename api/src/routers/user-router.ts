import { Router } from "express";
import { changeCurrentUserData, deleteCurrentUser, getCurrentUserData } from "../controllers/user-controller";
import { checkOwnerShip, verifyToken } from "../middleware/auth-middleware";

const userRoutes = Router();

userRoutes.delete('/rm/:user_id', verifyToken, checkOwnerShip, deleteCurrentUser);
userRoutes.get('/user-data', verifyToken, getCurrentUserData);
userRoutes.put('/edit/:user_id', verifyToken, checkOwnerShip, changeCurrentUserData);

export default userRoutes;