import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  createTodo,
  getTodo,
  updateTodo,
} from "../../features/todos/todoSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/stylesheets/TodoForm.css";
import { format } from "date-fns";

const TodoForm = ({ todo, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState(() => {
    const now = new Date();
    const defaultDueDate = new Date(now.setDate(now.getDate() + 7));
    return format(defaultDueDate, "yyyy-MM-dd");
  });
  const [category, setCategory] = useState("work");
  const [newCategory, setNewCategory] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (todo) {
      const fetchAndSetTodoData = async () => {
        try {
          const todoToEdit = await dispatch(getTodo(todo._id)).unwrap();
          setTitle(todoToEdit.title);
          setDescription(todoToEdit.description);
          setPriority(todoToEdit.priority);
          // Format due date to YYYY-MM-DD for input
          setDueDate(
            todoToEdit.dueDate
              ? format(new Date(todoToEdit.dueDate), "yyyy-MM-dd")
              : ""
          );
          setCategory(todoToEdit.category);
        } catch (error) {
          console.error("Error fetching todo:", error);
        }
      };

      fetchAndSetTodoData();
    }
  }, [todo, dispatch]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "dueDate":
        setDueDate(value);
        break;
      case "priority":
        setPriority(value);
        break;
      case "category":
        setCategory(value);

        if (value != "Other") {
          setNewCategory("");
        }

        break;
      case "newCategory":
        setNewCategory(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let selectedCategory = category;

     // Validate due date
     const today = new Date();
     const selectedDueDate = new Date(dueDate);
 
     // Remove time part of current date to compare only dates
     today.setHours(0, 0, 0, 0);
     selectedDueDate.setHours(0, 0, 0, 0);
 
     if (selectedDueDate < today) {
       toast.error("Due date cannot be earlier than today's date.");
       return;
     }

    // Validate category selection
    if (!category || (category === "Other" && !newCategory.trim())) {
      toast.error("Please select a category or enter a new one.");
      return;
    }

    const todoData = {
      title,
      description,
      priority,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      category: selectedCategory.toLowerCase(),
    };

    try {
      if (todo && todo._id) {
        // Update action
        await dispatch(updateTodo({ ...todoData, _id: todo._id })).unwrap();
        toast.success(`Task "${todoData.title}" updated successfully!`);
      } else {
        // Create action
        await dispatch(createTodo(todoData)).unwrap();
        toast.success(`Task "${todoData.title}" created successfully!`);
      }
      onSubmit();
    } catch (error) {
      console.error("Error submitting todo:", error);
      toast.error("Error submitting the task. Please try again.");
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          value={title}
          onChange={handleChange}
          required
          name="title"
          placeholder="Add a New Task"
          className="taskTitle-input"
        />
      </div>

      <div className="form-group">
        <textarea
          className="task-description textarea-no-resize"
          style={{ resize: "none" }}
          rows={4}
          type="text"
          value={description}
          onChange={handleChange}
          name="description"
          placeholder="Add Your Task Details..."
        />
      </div>
      <div className="form-group">
        <label>Complete By:</label>
        <input
          type="date"
          value={dueDate}
          onChange={handleChange}
          name="dueDate"
          placeholder="Complete By..."
        />
      </div>
      <div className="form-group">
        <label>Priority:</label>
        <select value={priority} onChange={handleChange} name="priority">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="form-group">
        <label>Category:</label>
        <select value={category} onChange={handleChange} name="category">
          <option value="academics">Academics</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="shopping">Shopping</option>
          <option value="fitness">Fitness</option>
          <option value="other">Other</option>
        </select>
        {category === "other" && (
          <input
            type="text"
            value={newCategory}
            onChange={handleChange}
            name="newCategory"
            placeholder=""
            className="new-category-input"
          />
        )}
      </div>
<div className="button-container">
<button className="create-todo-btn" type="submit">
        {todo && todo._id ? "Update Task" : "Create Task"}
      </button>
</div>
     
    </form>
  );
};

export default TodoForm;
