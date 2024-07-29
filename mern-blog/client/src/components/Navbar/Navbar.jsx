import React, { useState, useEffect } from "react";
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
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="navbar-logo">
        Storyfy
      </Link>
      {currentUser ? (
        <div className="navbar-links">
          <ul className="navbar-categories">
            <Link to={"/"} className="navbar-category">
              <li>All Blogs</li>
            </Link>
            <Link to={"/?category=health"} className="navbar-category">
              <li>Health</li>
            </Link>
            <Link to={"/?category=tech"} className="navbar-category">
              <li>Tech</li>
            </Link>
            <Link to={"/?category=anime"} className="navbar-category">
              <li>Anime</li>
            </Link>
            <Link to={"/?category=finance"} className="navbar-category">
              <li>Finance</li>
            </Link>
            <Link to={"/?category=other"} className="navbar-category">
              <li>Others</li>
            </Link>
          </ul>
          <div className="navbar-actions">
            <Link to="/create" className="navbar-action button blue">
              Write
            </Link>
            <span className="navbar-action button red" onClick={handleLogout}>
              Logout
            </span>
            <div className="navbar-user" title={currentUser.name}>
              {currentUser.name.split(" ")[0]}
            </div>
          </div>
        </div>
      ) : (
        <div className="navbar-links">
          <Link to="/login" className="navbar-action button">
            Sign In
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
