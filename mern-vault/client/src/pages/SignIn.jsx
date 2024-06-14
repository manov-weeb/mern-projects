import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice";
import { OAuth } from "../components";

export const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    try {
      const res = await fetch("/api/v1/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(signInFailure(data.message || "Something went wrong."));
        throw new Error(data.message || "Something went wrong.");
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg mt-12">
      <h1 className="text-3xl text-center font-semibold mb-8 text-gray-800">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth/>
      </form>
      <div className="flex my-5 gap-1">
        <p className="text-gray-600">Not Having an account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-600 hover:underline">Sign Up</span>
        </Link>
      </div>
      {error && <p className="text-red-700 mt-5 text-center">{error}</p>}
    </div>
  );
};

export default SignIn;