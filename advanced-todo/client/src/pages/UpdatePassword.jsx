import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../features/auth/authSlice";
import "../assets/stylesheets/UpdateProfile.css";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const { currentPassword, newPassword, confirmNewPassword } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmitPassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      alert("Passwords do not match");
      return;
    }

    const data = {
      userId: user._id,
      currentPassword,
      newPassword,
    };

    dispatch(updatePassword(data));
  };

  return (
    <div className="update-profile-container">
      <h2>Change Password</h2>
      <form onSubmit={handleSubmitPassword} className="update-password-form">
        <div className="form-group">
          <label htmlFor="currentPassword">Current Password</label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={currentPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={newPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmNewPassword">Confirm New Password</label>
          <input
            type="password"
            id="confirmNewPassword"
            name="confirmNewPassword"
            value={confirmNewPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="update-password-button" disabled={isLoading}>
          {isLoading ? "Updating..." : "Change Password"}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default UpdatePassword;
