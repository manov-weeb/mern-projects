import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/stylesheets/Signup.css";
import { useSelector, useDispatch } from "react-redux";
import { signupUser } from "../../features/auth/authSlice";
import { GoogleSignup } from "../components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const { username, email, password } = form;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signupUser(form))
      .unwrap()
      .then(() => {
        toast.success("Signup successful! Redirecting to login...");
        navigate("/log-in");
      })
      .catch((error) => {
        toast.error("Signup failed: " + error.message);
      });
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
