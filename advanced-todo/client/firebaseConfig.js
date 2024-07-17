// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAX-HP7f0aPvLiDZpT-RUZTJ76zcgO_w6A",
  authDomain: "advanced-todo-fe7c8.firebaseapp.com",
  projectId: "advanced-todo-fe7c8",
  storageBucket: "advanced-todo-fe7c8.appspot.com",
  messagingSenderId: "254448062235",
  appId: "1:254448062235:web:f17ffd2e2c2504cdad4dbe",
  measurementId: "G-01QW20SWTZ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();

export { signInWithPopup };
