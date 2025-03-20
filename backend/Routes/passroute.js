import express, { request } from "express";
const passroute=express.Router();
import {requestpass,pastpasses,status} from "../controllers/passcontroller.js";
import {authMiddleware} from "../middleware/auth.js";

passroute.post("/request",authMiddleware,requestpass);
passroute.get("/pending",authMiddleware,pastpasses);
passroute.get('/status',authMiddleware,status);
export default passroute;