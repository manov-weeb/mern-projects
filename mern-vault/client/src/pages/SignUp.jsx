

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { OAuth } from "../components";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/v1/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Something went wrong.");
      }
      setLoading(false);
      navigate("/sign-in");
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg mt-12">
      <h1 className="text-3xl text-center font-semibold mb-8 text-gray-800">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          id="username"
          placeholder="Username"
          className="bg-slate-50 border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
        />
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-50 border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-50 border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-blue-600 text-white p-3 rounded-lg uppercase transition duration-150 hover:bg-blue-500 disabled:opacity-50"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
        <OAuth/>
      </form>
      <div className="flex my-5 gap-1">
        <p className="text-gray-600">Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-600 hover:underline">Sign In</span>
        </Link>
      </div>
      {error && <p className="text-red-700 mt-5 text-center">{error}</p>}
    </div>
  );
};

export default SignUp;
