import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { logoutUser } from "../../features/auth/authSlice";
import { Link } from "react-router-dom";
import { Task } from "../components";
import { fetchTodos } from "../../features/todos/todoSlice";
import "../assets/stylesheets/Home.css";
import { format } from "date-fns";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const { todos } = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  if (!user) {
    return <Navigate to="/log-in" />;
  }

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm.trim("").toLowerCase())
  );

  const pendingTasksCount = filteredTodos.filter(
    (todo) => !todo.completed
  ).length;
  const uniqueCategories = [
    ...new Set(filteredTodos.map((todo) => todo.category)),
  ];
  const priorities = ["low", "medium", "high"];
  const currentTasksCount = filteredTodos.filter((todo) => {
    const dueDate = new Date(todo.dueDate);
    return new Date() <= dueDate;
  }).length;

  const getPendingTasksCount = (todos, criteria, value) => {
    return todos.filter((todo) => {
      if (criteria === "category") {
        return todo.category === value && !todo.completed;
      } else if (criteria === "priority") {
        return todo.priority === value && !todo.completed;
      }
      // Handle other criteria if needed
      return false;
    }).length;
  };

 

  return (
    <div className="home-container">
      <div className="upper-section">
        <div className="home-user-info">
          <h1 className="welcome-message">Hello, {user.username}</h1>
          <span>{format(new Date(), "dd MMM yyyy")}</span>
        </div>
        
        <div className="tasks-summary">
          <h3 className="home-content">
            My Tasks{" "}
            <span className="current-tasks-count">{currentTasksCount}</span>
          </h3>
          <Link to="/add-task" className="create-task-link"> 
            Add Task
          </Link>
        </div>
      </div>

      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search tasks..."
        />
      </div>

      <div className="lower-section">
        <div className="left-section">
          <div className="left-section-header">
            <h2>Tasks List</h2>
            <Link to="/tasks" className="view-all-link">
              View All
            </Link>
          </div>

          <div className="home-tasks-list">
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
                />
              ))
            ) : (
              <p>No tasks found.</p>
            )}
          </div>
        </div>

        <div className="right-section">
          <div className="categories-cards">
            <h2>Categories </h2>
            {uniqueCategories.map((category) => (
              <Link key={category} to={`/tasks?category=${category}`}>
                <div className="category-card">
                  <h2 className="category-card-title">{category}</h2>
                  <div className="category-tasks">
                    <div>
                      Total Pending Tasks:{" "}
                      {getPendingTasksCount(todos, "category", category)}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="priorities-cards">
            <h2>Check your Tasks By Priorities</h2>
            {priorities.map((priority) => (
              <Link key={priority} to={`/tasks?priority=${priority}`}>
                <div className="category-card">
                  <h2 className="category-card-title">{priority}</h2>
                  <div className="category-tasks">
                    <div>
                      Total Pending Tasks:{" "}
                      {getPendingTasksCount(todos, "priority", priority)}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
