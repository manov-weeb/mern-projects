import React from "react";
import "./../assets/stylesheets/Public.css";
import homePng from "../assets/images/home.webp";
import { useNavigate } from "react-router-dom";

const Public = () => {
  const navigate = useNavigate();
  return (
    <header className="section">
      <div className="header-left">
        <img src={homePng} alt="Home" />
      </div>
      <div className="header-right">
        <h1>
          Manage, Complete, Excel: <br /> <i>Boost Your Productivity</i>
        </h1>
        <p>A personalized task manager to keep you organized and productive.</p>
        <button
          className="start-button button"
          onClick={() => navigate("/log-in")}
        >
          Let's Start
        </button>
      </div>
    </header>
  );
};

export default Public;
