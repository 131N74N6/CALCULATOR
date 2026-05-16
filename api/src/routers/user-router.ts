import { Router } from "express";
import { changeCurrentUserData, deleteCurrentUser, getCurrentUserData } from "../controllers/user-controller";
import { checkOwnerShip, verifyToken } from "../middleware/auth-middleware";

const userRoutes = Router();

userRoutes.delete('/remove/:user_id', verifyToken, checkOwnerShip, deleteCurrentUser);
userRoutes.get('/user-data/:user_id', verifyToken, checkOwnerShip, getCurrentUserData);
userRoutes.put('/edit/:user_id', verifyToken, checkOwnerShip, changeCurrentUserData);

export default userRoutes;