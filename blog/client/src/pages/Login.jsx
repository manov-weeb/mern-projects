import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/auth-slice";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const disptach = useDispatch();
  const { currentUser, status } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  console.log(inputs);
  console.log(currentUser);

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      disptach(login(inputs));
      navigate("/");
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };

  return (
    <div className="auth">
      <h1>Login</h1>
      <form>
        <input
          required
          type="email"
          name="email"
          placeholder="email"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          name="password"
          placeholder="password"
          onChange={handleChange}
        />
        <button
          disabled={!inputs.email || !inputs.password}
          type="button"
          onClick={handleSubmit}
        >
          Login
        </button>

        {error && <p className="wrong-auth-error">Wrong Credentials!</p>}
        <span>
          Don't Have an Account? <Link to="/register">Register Here</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
