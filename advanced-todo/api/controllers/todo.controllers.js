import mongoose from "mongoose";
import Todo from "../models/todo.model.js";

export const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.userId });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTodo = async (req, res) => {
  const { title, description, priority, completed, dueDate, category } =
    req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required!" });
  }

  try {
    const newTodo = new Todo({
      title,
      description,
      priority,
      completed,
      dueDate,
      category,
      user: req.userId,
    });

    const savedTodo = await newTodo.save();
    return res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  try {
    const todo = await Todo.findOne({ _id: id, user: req.userId });
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description, category, priority, completed, dueDate } =
    req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (String(todo.user) !== String(req.userId)) {
      return res.status(403).json({ message: "Authorization error!" });
    }

    todo.title = title ?? todo.title;
    todo.description = description ?? todo.description;
    todo.priority = priority ?? todo.priority;
    todo.completed = completed ?? todo.completed;
    todo.dueDate = dueDate ?? todo.dueDate;
    todo.category = category ?? todo.category;

    const updatedTodo = await todo.save();

    return res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  try {
    const deletedTodo = await Todo.findOneAndDelete({
      _id: id,
      user: req.userId,
    });

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ _id: deletedTodo._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
