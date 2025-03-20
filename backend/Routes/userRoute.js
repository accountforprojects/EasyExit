import express from "express";
import { registerUser, loginUser, sendotp,profilefetch } from "../controllers/usercontroller.js";  // ✅ Use import
import {authMiddleware} from "../middleware/auth.js";
const userRouter = express.Router();

userRouter.post("/send-otp", sendotp);
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/profile",authMiddleware,profilefetch);
export default userRouter;  // ✅ Use export default
