import { Router } from "express";
import { calculateIp, deleteAllLogs, deleteOneLog, getAllLogs } from "../controllers/ipv4-calculator-controller";
import { verifyToken } from "../middleware/auth-middleware";

const ipV4Routers = Router();

ipV4Routers.delete('/rm-all', verifyToken, deleteAllLogs);
ipV4Routers.delete('/rm/:id', verifyToken, deleteOneLog);

ipV4Routers.get('/logs', verifyToken, getAllLogs);

ipV4Routers.post('/execute', verifyToken, calculateIp);

export default ipV4Routers;