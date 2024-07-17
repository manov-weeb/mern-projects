import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { Layout, Navbar, Public, Task } from "./components";
import {
  Login,
  Signup,
  Home,
  CreateTodo,
  EditTodo,
  Tasks,
  User,
  UpdatePassword,
} from "./pages";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import UpdateProfile from "./pages/UpdateProfile";

const App = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Layout />}>
          {user ? (
            <>
              <Route index element={<Home />} />
              <Route path="add-task" element={<CreateTodo />} />
              <Route path="edit-task/:id" element={<EditTodo />} />
              <Route path="tasks" element={<Tasks />} />
            </>
          ) : (
            <Route index element={<Public />} />
          )}
          <Route path="log-in" element={<Login />} />
          <Route path="sign-up" element={<Signup />} />
          <Route path="profile" element={<User />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
          <Route path="/update-password" element=<UpdatePassword /> />
        </Route>
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;
