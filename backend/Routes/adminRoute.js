import express from "express";
const adminRoute=express.Router();
import { PendingPasses,AcceptedPasses,RejectedPasses,ChangeStatus } from "../controllers/admincontroller.js";
import {adminMiddleware} from "../middleware/auth.js";
adminRoute.get('/pending',adminMiddleware,PendingPasses);
adminRoute.get('/rejected',adminMiddleware,RejectedPasses);
adminRoute.get('/accepted',adminMiddleware,AcceptedPasses);
adminRoute.post('/status',adminMiddleware,ChangeStatus);
export default adminRoute;