import React, { useRef } from "react";
import { useSelector } from "react-redux";
import "../assets/stylesheets/User.css";
import { Link } from "react-router-dom";

const User = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="user-container">
      <div className="user-info">
        <img
          className="user-profile-pic"
          src={user.profilePicture}
          alt="Profile"
        />
        <div className="user-details">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          {/* Add more details as needed */}
        </div>
      </div>
      <div className="action-buttons">
        <Link to={"/update-profile"}>
          <button className="action-button">Update Profile</button>
        </Link>
        <button className="action-button">Change Password</button>
        <button className="action-button delete">Delete Account</button>
      </div>
    </div>
  );
};

export default User;
