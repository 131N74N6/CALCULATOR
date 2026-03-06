import { Router } from "express";
import { changeCurrentUserData, deleteCurrentUser, getCurrentUserData } from "../controllers/user.controller";
import { checkOwnerShip, verifyToken } from "../middleware/auth.middleware";

const userRoutes = Router();

userRoutes.delete('/delete/:user_id', verifyToken, checkOwnerShip, deleteCurrentUser);
userRoutes.get('/get/:user_id', verifyToken, checkOwnerShip, getCurrentUserData);
userRoutes.put('/change/:user_id', verifyToken, checkOwnerShip, changeCurrentUserData);

export default userRoutes;