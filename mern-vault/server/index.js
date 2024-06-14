import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { connectDb } from "./config/db.js";
import { userRouter } from "./routes/User-route.js";
import { authRouter } from "./routes/Auth-route.js";
//Loading env variables
dotenv.config();

//connecting to MongoDB
connectDb();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

app.listen(3000, () => {
  console.log("Server listening on PORT 3000");
});
