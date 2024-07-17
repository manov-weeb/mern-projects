import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDb from "./config/db.js";
import authRoute from "./routes/auth.route.js";
import todoRoute from "./routes/todo.route.js";
import verifyToken from "./middlewares/verifyUser.js"; 
import userRoute from "./routes/user.route.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Loading environment variables
dotenv.config();

// Cookie parser middleware to access cookies
app.use(cookieParser());

// Using the built-in middleware to parse JSON
app.use(express.json());

// CORS setup
app.use(
  cors({
    origin: "http://127.0.0.1:5173", // Adjust to your frontend URL
    credentials: true,
  })
);

// Connect to MongoDB
connectDb();

// Routes
app.use("/api/v1/auth", authRoute); // Authentication routes
app.use("/api/v1/todo", verifyToken, todoRoute); // Todo routes (protected)
app.use("/api/v1/user", verifyToken, userRoute); // User routes (protected)

// Ensure that the app starts only when the Database is connected
mongoose.connection.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Todo App - Backend running on PORT ${PORT}`);
  });
});

mongoose.connection.on("error", (error) => {
  console.log(error);
});
