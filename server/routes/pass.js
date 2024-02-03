import { Router } from "express";
import { savePassword, savePasswords, deletePass } from "../controller/pass.js";
import {protect} from "../middleware/authmiddleware.js"
const passRouter = Router();

passRouter.post("/passwords",protect,savePassword);

passRouter.get("/getdata", protect, savePasswords);

passRouter.get("/delete/:id",protect ,deletePass);

export default passRouter;
