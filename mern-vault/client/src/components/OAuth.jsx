import React from "react";
import { useDispatch } from "react-redux";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase"; // Ensure this imports the initialized Firebase app
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleGoogleClick = async () => {
    try {
      // Create a new instance of GoogleAuthProvider
      const provider = new GoogleAuthProvider();

      // Get the auth instance from your Firebase app
      const auth = getAuth(app);

      // Sign in with a popup and pass the auth instance and provider
      const result = await signInWithPopup(auth, provider);

      const res = await fetch("/api/v1/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      const data = await res.json();

      dispatch(signInSuccess(data))
      // Log the result for debugging purposes
      console.log(result);
      navigate("/profile")
    } catch (error) {
      // Handle errors here
      console.error("Error during sign-in:", error);
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="text-white bg-red-700 p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-75"
    >
      Continue with Google
    </button>
  );
};

export default OAuth;
