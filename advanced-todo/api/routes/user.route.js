import express from "express";
import { deleteUser, getUser, updateUser } from "../controllers/user.controllers.js";

const userRoute = express.Router();

userRoute
  .get("/", getUser)
  .patch("/:id", updateUser)
  .delete("/:id", deleteUser);

export default userRoute;
