import { signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, googleProvider } from "../../firebaseConfig";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { signUpWithGoogle } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const GoogleSignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, error, user } = useSelector((state) => state.auth);
  const handleGoogleSignup = async () => {
    try {
      // Sign in with Google using Firebase
      const result = await signInWithPopup(auth, googleProvider);
      const { user } = result;
      const credentials = {
        email: user.email,
        name: user.displayName,
        photo: user.photoURL,
      };

      // Dispatch the thunk to send data to your backend
      const response = await dispatch(signUpWithGoogle(credentials)).unwrap();

      if (response && !isLoading && !error) {
          console.log(response);
          navigate("/");
        }
    } catch (error) {
      console.log("Google Sign In Error: ", error);
    }
  };
  return (
    <button onClick={handleGoogleSignup}>
      <ion-icon name="logo-google"></ion-icon>Continue With Google{" "}
    </button>
  );
};

export default GoogleSignup;
