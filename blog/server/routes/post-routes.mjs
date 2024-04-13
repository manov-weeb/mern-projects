import express from "express";
import {
  addPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/post-controllers.mjs";
import { verifyToken } from "../middleware/verifyTokenHandler.mjs";


const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", addPost);
router.delete("/:id", verifyToken, deletePost);
router.put("/:id", updatePost);

export default router;
