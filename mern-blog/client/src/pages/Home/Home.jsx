import React from "react";
import "./Home.css";

import { LandingPage, Navbar, Posts } from "../../components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const {
    status,
    error: loginError,
    currentUser,
  } = useSelector((state) => state.user);

  return (
    <div>
      {currentUser ? (
        <div>
          <Navbar />
          <Posts />
        </div>
      ) : (
        <LandingPage/>
      )}
    </div>
  );
};

export default Home;
