import { Router } from "express";
import { login, signup, logout } from "../controller/auth.js";
import { protect } from "../middleware/authmiddleware.js";
const authRouter = Router();
authRouter.post("/login", login);
authRouter.post("/signup", signup);
authRouter.get("/logout",protect,logout)
export default authRouter;