import express from "express";
import { signup , signin, google, signout} from "../controllers/Auth-controller.js";

export const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);
authRouter.post("/google", google)
authRouter.get("/signout", signout)
