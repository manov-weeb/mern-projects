import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import "./Signup.css";
import axios from "axios";

const Signup = () => {

  const navigate = useNavigate()

  const [error, setError] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    cnfPassword: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/register",
        { name: inputs.name, email: inputs.email, password: inputs.password }
      );
      // If registration is successful, you can redirect the user or show a success message
      console.log(response);

      navigate("/login")
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error);
        setError(error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        setError("No response received from server.");
        console.log(error);
      } else {
        // Something happened in setting up the request that triggered an Error
        setError("An error occurred while processing your request.");
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const isValidEmail = (email) => {
      return emailRegex.test(email);
    };

    const isValidPassword = (password) => {
      return passwordRegex.test(password);
    };

    const emailIsValid = isValidEmail(inputs.email);
    const passwordIsValid = isValidPassword(inputs.password);
    const passwordsMatch = inputs.password === inputs.cnfPassword;

    if (!emailIsValid) {
      setEmailError(true);
    } else if (!passwordIsValid) {
      setPasswordError(true);
    } else if (!isPasswordMatch) {
      setIsPasswordMatch(false);
    } else {
      setEmailError(false); // Reset all error states if all validations pass
      setPasswordError(false);
      setIsPasswordMatch(true);
      setError(""); // Reset error if all validations pass
    }
  }, [inputs.email, inputs.password, inputs.cnfPassword]);

  return (
    <div className="form-container">
      <h2 className="form-header"> Create a Storyfy Account </h2>
      <form className="signup-form">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          value={inputs.name}
          required
          type="text"
          placeholder="e.g. Nani Gopal Mandal"
          onChange={handleChange}
        />

        <label htmlFor="email">Email</label>
        <input
          // className={emailError ? "error-field" : ""}
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
          // className={passwordError ? "error-field" : ""}
          id="password"
          required
          value={inputs.password}
          name="password"
          type="password"
          placeholder=""
          onChange={handleChange}
        />

        <label htmlFor="cnf-password">Confirm Password</label>
        <input
          // className={isPasswordMatch ? "error-field": ""}
          id="cnf-password"
          value={inputs.cnfPassword}
          name="cnfPassword"
          required
          type="password"
          placeholder=""
          onChange={handleChange}
        />
        {error && <p className="form-error"> Some error occured! </p>}

        <button type="submit" onClick={handleSubmit} className="form-btn">
          Create An Account{" "}
        </button>

        <span className="form-message">
          Do you already have an account? Click here to Login.
        </span>
      </form>
    </div>
  );
};

export default Signup;
