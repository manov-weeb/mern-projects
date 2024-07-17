import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { TodoForm } from "../components";

const CreateTodo = () => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    console.log("Todo created!");
    navigate("/");
  };

  return (
    <div className="todo-page">
    
      <TodoForm todo={{}} onSubmit={handleSubmit} />
      <Link className="go-home-link" to="/">Go back to Home</Link>
    </div>
  );
};

export default CreateTodo;
