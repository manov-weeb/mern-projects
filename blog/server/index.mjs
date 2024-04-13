import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import postRoutes from "./routes/post-routes.mjs";
import authRoutes from "./routes/auth-routes.mjs";
import { connectDB } from "./config/db.mjs";

import { config } from "dotenv";
config();

const app = express();
connectDB();

app.use(cookieParser());

const upload = multer({ dest: "./uploads/" });

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/auth", authRoutes);

app.get("/setcook", (req, res) => {
  res.cookie("mycookie", "cookie-value").json({});
}); 

app.post("/upload", upload.single("file"), function (req, res) {
  res.status(200).json(req.file.filename);
});


app.get("/getcook", (req, res) => {
  console.log(req.cookies);
  res.json(req.cookies);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on Port ${PORT}`);
});
