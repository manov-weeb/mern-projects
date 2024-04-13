import React from "react";
import Logo from "../img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/auth-slice";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav>
      <div className="container">
        <div className="logo">
          <img src={Logo} alt="Logo"></img>
        </div>
        <div className="links">
        <Link className="link" to={"/?cat="}>
            {" "}
            ALL
          </Link>
          <Link className="link" to={"/?cat=art"}>
            {" "}
            ART
          </Link>
          <Link className="link" to={"/?cat=tech"}>
            {" "}
            TECH
          </Link>
          <Link className="link" to={"/?cat=design"}>
            {" "}
            DESIGN
          </Link>
          <Link className="link" to={"/?cat=work"}>
            {" "}
            WORK
          </Link>
          <Link className="link" to={"/?cat=health"}>
            {" "}
            HEALTH
          </Link>
          <Link className="link" to={"/?cat=other"}>
            {" "}
            OTHERS
          </Link>
          <span> {currentUser && currentUser?.username} </span>

          
          {currentUser ? (
            <span onClick={handleLogout}> Logout </span>
          ) : (
            <Link className="link" to={"/login"}>
              Login
            </Link>
          )}
          <span>
            <Link className="link write" to={"/create"}>
              Write
            </Link>
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
