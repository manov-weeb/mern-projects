import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const registerUrl = "http://localhost:5000/api/v1/auth/register";
  const registerOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inputs),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make the POST request using fetch
      const response = await fetch(registerUrl, registerOptions);

      // Check if the response is successful (status code between 200 and 299)
      if (response.ok) {
        // Handle successful response
        const data = await response.json(); // Parse the JSON response
        console.log("Registration successful:", data);
        // Optionally, perform any additional actions after successful registration
        navigate("/login");
      } else {
        // Handle error response
        const errorMessage = await response.text(); // Get error message from response body
        // const errorJson = await response.json()
        setError(JSON.parse(errorMessage).message);
        throw new Error(`Registration failed: ${errorMessage}`);
      }
    } catch (error) {
      // Handle any errors that occurred during the fetch
      console.error("Error:", error.message);
    }
  };

  console.log(inputs);
  return (
    <div className="auth">
      <h1>Sign In</h1>
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
          type="text"
          name="username"
          placeholder="username"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button type="button" onClick={handleSubmit}>
          Sign In
        </button>
        {error && <p className="wrong-auth-error">{error}</p>}
        <span>
          Have an Account? <Link to={"/login"}>Login Here</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
