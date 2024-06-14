import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { About, Home, Profile, SignIn, SignUp } from "./pages";
import { Header, PrivateRoute } from "./components";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          {" "}
          <Route path="/profile" element={<Profile />} />{" "}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
