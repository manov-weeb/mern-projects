import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Create, Home, Login, Signup, Post, Edit} from "./pages";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element= {<Create/>}/>
        <Route path="/post/:id" element={<Post/>}/>
        <Route path="/edit/:id" element={<Edit/>}/>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
