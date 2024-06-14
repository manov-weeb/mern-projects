// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-8db19.firebaseapp.com",
  projectId: "mern-auth-8db19",
  storageBucket: "mern-auth-8db19.appspot.com",
  messagingSenderId: "747354453689",
  appId: "1:747354453689:web:575f762c7452d6f9150d68"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);