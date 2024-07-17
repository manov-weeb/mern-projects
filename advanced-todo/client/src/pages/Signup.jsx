import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/stylesheets/Signup.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { signupUser } from "../../features/auth/authSlice";
import { GoogleSignup } from "../components";

const Signup = () => {
  const dispatch = useDispatch();
  const { isLoading, error, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(signupUser(form)).unwrap();
      if (response && !isLoading && !error) {
        console.log(response);
        navigate("/log-in");
      }
    } catch (error) {
      console.log("Sign Up Error: ", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  

  return (
    <div className="signup-container">
      <h2>Sign up for Task Wise</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          required
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          required
          value={form.username}
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
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm Password"
          required
          value={form.confirmPassword}
          onChange={handleChange}
        />
        <button
          disabled={isLoading}
          type="submit"
          className="button signup-button"
        >
          Sign Up
        </button>
      </form>
      <GoogleSignup />
      <p>
        Already have an account?{" "}
        <Link to="/log-in">Try logging in instead</Link>
      </p>
    </div>
  );
};

export default Signup;
