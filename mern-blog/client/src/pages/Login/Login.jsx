import React, { useState, useEffect } from "react";
import "./Login.css";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { STATUSES, login } from "../../store/UserSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState("");

  const {
    status,
    error: loginError,
    currentUser,
  } = useSelector((state) => state.user);

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (status === STATUSES.IDLE && currentUser) {
      navigate("/");
    }
  }, [status, currentUser, navigate]);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login(inputs));

      if (!loginError && currentUser) {
        navigate("/");
      } else {
        setError(loginError);
      }
    } catch (err) {
      setError("Failed to Login");
      console.error("Error:", err);
    }
  };

  return (
    !currentUser ? (
      <div className="form-container">
        <h2 className="form-header"> Welcome Back! </h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            value={inputs.email}
            required
            type="email"
            placeholder="e.g. ngm25@gmail.com"
            onChange={handleChange}
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            value={inputs.password}
            required
            type="password"
            name="password"
            placeholder=""
            onChange={handleChange}
          />
          {error && <p className="form-error">{error}</p>}
          <button type="submit" className="form-btn">
            Login
          </button>

          <span className="form-message">
            Don't Have An Account? <Link to={"/signup"}>Click here to create one.</Link>
          </span>
        </form>
      </div>
    ) : (<div> Logout?</div>)
  );
};

export default Login;
