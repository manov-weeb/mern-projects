import express from "express";
import {
  googleSignup,
  login,
  logout,
  signup,
} from "../controllers/auth.controllers.js";

const authRoute = express.Router();

authRoute
  .post("/signup", signup)
  .post("/login", login)
  .post("/googleSignin", googleSignup)
  .post("/logout", logout);

export default authRoute;
