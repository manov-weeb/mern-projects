import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "../assets/stylesheets/Task.css";
import { format } from "date-fns";
import { deleteTodo, updateTodo } from "../../features/todos/todoSlice";
import { useNavigate } from "react-router-dom";

const Task = ({ _id, title, createdDate, dueDate, priority, category, isCompleted }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Formatting dates to "DD MMM YYYY"
  const formattedCreatedDate = createdDate
    ? format(new Date(createdDate), "dd MMM yyyy")
    : "";
  const formattedDueDate = dueDate
    ? format(new Date(dueDate), "dd MMM yyyy")
    : "";

  const [completed, setCompleted] = useState(isCompleted);

  const handleCheckboxChange = () => {
    const updatedStatus = !completed;
    setCompleted(updatedStatus);

    dispatch(updateTodo({ _id, completed: updatedStatus }));
  };

  const handleDelete = (id) => {
    console.log("deleting todo ", id);
    dispatch(deleteTodo(_id));
  };

  return (
    <div className="task-div">
      <div className="task-header">
        <h3 className="task-title">{title}</h3>
        <div className="task-menu">
          <ion-icon
            className="task-menu-btn"
            name="ellipsis-horizontal"
          ></ion-icon>
          <ul className="task-menu-options">
            <li
              onClick={() => navigate(`/edit-task/${_id}`)}
              className="menu-option"
            >
              <ion-icon name="create-outline"></ion-icon>
              <p>Edit</p>
            </li>
            <li onClick={()=>handleDelete(_id)} className="menu-option">
              <ion-icon name="trash-outline"></ion-icon>
              <p>Delete</p>
            </li>
          </ul>
        </div>
      </div>

      <div className="task-timing">
        <span className="task-started">
          <ion-icon name="calendar-outline"></ion-icon> {formattedCreatedDate}
        </span>
        <span className="task-dueDate">
          <ion-icon name="flag-outline"></ion-icon> {formattedDueDate}
        </span>
      </div>
      <div className="task-actions">
        <input
          type="checkbox"
          checked={completed}
          onChange={handleCheckboxChange}
          className="task-completed-checkbox"
        />
        <div className="task-detail">
        <button className={`priority-button ${priority.toLowerCase()}`}>
          {priority}
        </button>
        <button className={`category-button ${category.toLowerCase()}`}>
          {category}
        </button>
        </div>
      
      </div>
    </div>
  );
};

export default Task;
