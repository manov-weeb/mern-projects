import express from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodo,
  updateTodo,
} from "../controllers/todo.controllers.js";

const todoRoute = express.Router();

todoRoute
  .get("/", getAllTodos)
  .post("/", createTodo)
  .get("/:id", getTodo)
  .patch("/:id", updateTodo)
  .delete("/:id", deleteTodo);

export default todoRoute;
