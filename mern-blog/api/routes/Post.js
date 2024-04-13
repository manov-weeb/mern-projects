import express from "express";
import multer from "multer";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import {
  deletePost,
  editPost,
  getAllPosts,
  getPost,
  publishPost,
} from "../controllers/Post.js";



export const postRouter = express.Router();


// Multer configuration
const uploadMiddleware = multer({ dest: "uploads/" });
 
// Routes
postRouter.get("/posts", getAllPosts).get("/:id", getPost);
postRouter.post("/publish", uploadMiddleware.single('image'), publishPost);
postRouter.put("/:id", uploadMiddleware.single('image'),  editPost).delete("/:id", deletePost);
