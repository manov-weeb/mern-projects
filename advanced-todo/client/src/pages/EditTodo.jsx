import React from "react";
import { Link, useParams } from "react-router-dom";
import { TodoForm } from "../components";


const EditTodo = () => {
  const { id } = useParams();
  const handleSubmit = () => {
    console.log("Todo updated!");
   
  };

  return (
    <div className="todo-page">
    
      <TodoForm todo={{ _id: id }} onSubmit={handleSubmit} />
      <Link className="go-home-link" to="/">Go back to Home</Link>
    </div>
  );
};

export default EditTodo;
