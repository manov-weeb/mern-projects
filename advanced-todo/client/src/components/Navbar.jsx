import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../features/auth/authSlice";
import "./../assets/stylesheets/Navbar.css";
import homePng from "../assets/images/home.webp";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={homePng} alt="Home" />
        <Link to={"/"}>
          <span>Task Wise</span>
        </Link>
      </div>
      <div className="navbar-right">
        <ul className="nav-links">
          {user ? (
            <li className="nav-item">
              <div className="user-info">
                {user.profilePicture ? (
                  <Link to={`/profile`}>
                    <img
                      className="profile-pic"
                      src={user.profilePicture}
                      alt="Profile"
                    />
                  </Link>
                ) : (
                  <img className="profile-pic" src="" alt="Default profile" />
                )}
              </div>
              <button className="nav-button" onClick={handleLogout}>
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/log-in" className="nav-button">
                  Log In
                </Link>
              </li>
              <li>
                <Link to="/sign-up" className="nav-button">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
