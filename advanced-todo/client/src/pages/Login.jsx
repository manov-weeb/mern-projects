import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "../assets/stylesheets/Login.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/auth/authSlice";

const Login = () => {
  // Initializing the useDispatch hook.
  const dispatch = useDispatch();

  // Destructuring the variables from auth reducer.
  const { isLoading, error, user } = useSelector((state) => state.auth);

  // Initializing the useNavigate hook.
  const navigate = useNavigate();

  // Form object to store the user credentials.
  const [form, setForm] = useState({
    emailOrUsername: "",
    password: "",
  });

  // State to store, if user wants to view the password while signing up.
  const [showPassword, setShowPassword] = useState(false);

  // Function to handle the state of the form.
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(loginUser(form)).unwrap();
      if (response && !error && !isLoading) {
        console.log("Login successful:", response);
        navigate("/");
      }
    } catch (error) {
      console.log("Sign In Error: ", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (user) {
    // Navigate to "/home" if the user is already logged in.
    return <Navigate to="/home" />;
  }

  return (
    <div className="login-container">
      <h2>Welcome Back To Task Wise!</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          id="emailOrUsername"
          name="emailOrUsername"
          placeholder="Email or Username"
          required
          value={form.emailOrUsername}
          onChange={handleChange}
        />
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Password"
            required
            value={form.password}
            onChange={handleChange}
          />
          <button
            type="button"
            className="toggle-password"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <button type="submit" className="button login-button" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Log In"}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <p>
        Don't have an account? <Link to="/sign-up">Sign up now</Link>
      </p>
    </div>
  );
};

export default Login;
