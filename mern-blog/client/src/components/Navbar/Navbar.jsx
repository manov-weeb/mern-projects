import React from "react";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../store/UserSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const handleLogout = async () => {
    try {
      console.log("Logout Clicked");
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav>
      <h2 className="blog-logo">Blog App</h2>
      <ul className="blog-categories">
        <Link>
          <li>all</li>
        </Link>
        <Link to={"/?category=health"}>
          {" "}
          <li>health</li>
        </Link>
        <Link to={"/?category=tech"}>
          <li>tech</li>
        </Link>
        <Link to={"/?category=anime"}>
          <li>anime</li>
        </Link>
        <Link to={"/?category=others"}>
          <li>others</li>
        </Link>
      </ul>
      <div>
        {currentUser ? (
          <>
           <Link to="/create"><span > Write </span></Link> 
            <span className="logout-btn" onClick={handleLogout}>
              {" "}
              Logout{" "}
            </span>
          </>
        ) : (
          <Link to={"/login"}>
            <span> Login to Write</span>{" "}
          </Link>
        )}
      </div>
      <div>
      <Link> {currentUser.name.split(" ")[0]} </Link> 
      </div>
    </nav>
  );
};

export default Navbar;
