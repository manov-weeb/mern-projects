import express from "express";
import path from "path"
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { connectDb } from "./config/db.js";
import { userRouter } from "./routes/User.js";
import { postRouter } from "./routes/Post.js";

//Loading env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//connecting to MongoDB
connectDb();
app.use(cookieParser())
//using express.json() middleware
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/v1/auth", userRouter);
app.use("/api/v1/post", postRouter);

app.listen(PORT, () => {
  console.log(`Server is running at Port ${PORT}`);
});
