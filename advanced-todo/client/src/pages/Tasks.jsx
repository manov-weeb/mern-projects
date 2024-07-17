import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Task } from "../components";
import { fetchTodos } from "../../features/todos/todoSlice";
import "../assets/stylesheets/Tasks.css";

const Tasks = () => {
  const { todos } = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const categorySearch = searchParams.get("category");
  const prioritySearch = searchParams.get("priority")

  useState(() => {
    dispatch(fetchTodos());
    console.log(categorySearch)
  }, [todos, dispatch]);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("createdDate");
  const [filterCategory, setFilterCategory] = useState(categorySearch || "All");
  const [filterPriority, setFilterPriority] = useState(prioritySearch || "All");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortType(event.target.value);
  };

  const handleCategoryFilterChange = (event) => {
    setFilterCategory(event.target.value);
  };

  const handlePriorityFilterChange = (event) => {
    setFilterPriority(event.target.value);
  };

  const handleDelete = () => {
    console.log("first")
  }

  const sortedTodos = todos.slice().sort((a, b) => {
    if (sortType === "dueDate") {
      return new Date(a.dueDate) - new Date(b.dueDate);
    } else if (sortType === "priority") {
      return a.priority.localeCompare(b.priority);
    } else {
      return new Date(b.createdDate) - new Date(a.createdDate);
    }
  });

  const filteredTodos = sortedTodos
    .filter((todo) =>
      todo.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
    )
    .filter((todo) => {
      if (filterCategory === "All" && filterPriority === "All") {
        return true;
      }
      if (filterCategory !== "All" && filterPriority !== "All") {
        return (
          todo.category === filterCategory && todo.priority === filterPriority
        );
      }
      if (filterCategory !== "All") {
        return todo.category === filterCategory;
      }
      if (filterPriority !== "All") {
        return todo.priority === filterPriority;
      }
      return false;
    });

  const uniqueCategories = [
    "All",
    ...new Set(todos.map((todo) => todo.category)),
  ];
  const priorities = ["All", "low", "medium", "high"];

  return (
    <div className="tasks-container">
      <div className="tasks-header">
        <h1>All Tasks</h1>
        <div className="tasks-actions">
        <div className="search-bar-div">
        <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search tasks..."
            className="search-input"
          />
        </div>
         
         <div className="filters-and-sorting-div">
         <select
            value={sortType}
            onChange={handleSortChange}
            className="sort-select"
          >
            <option value="createdDate">Sort by Date Created</option>
            <option value="dueDate">Sort by Due Date</option>
            <option value="priority">Sort by Priority</option>
          </select>
          <select
            value={filterCategory}
            onChange={handleCategoryFilterChange}
            className="filter-select"
          >
            {uniqueCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            value={filterPriority}
            onChange={handlePriorityFilterChange}
            className="filter-select"
          >
            {priorities.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
         </div>
        
          <Link to="/add-task" className="add-task-link">
            Add New Task
          </Link>
        </div>
      </div>

      <div className="tasks-list">
        {filteredTodos.length > 0 ? (
          filteredTodos.map((todo) => (
            <Task
              key={todo._id}
              _id={todo._id}
              title={todo.title}
              createdDate={todo.createdAt}
              dueDate={todo.dueDate}
              priority={todo.priority}
              isCompleted={todo.completed}
              category={todo.category}
              onDelete = {handleDelete}
            />
          ))
        ) : (
          <p>No tasks found.</p>
        )}
      </div>
    </div>
  );
};

export default Tasks;
