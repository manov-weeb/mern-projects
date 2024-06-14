import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { updateUser, deleteUser } from "../controllers/User-controller.js";

export const userRouter = express.Router();

userRouter.put("/update/:id", verifyToken, updateUser);
userRouter.delete("/delete/:id", verifyToken, deleteUser);
