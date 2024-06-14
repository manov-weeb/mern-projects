import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-7xl mx-auto p-4">
        <Link to={"/"}>
          {" "}
          <h1 className="font-bold">MERNVault</h1>{" "}
        </Link>
        <ul className="flex gap-5 items-center">
          <Link to={"/"}>
            {" "}
            <li>Home</li>{" "}
          </Link>
          <Link to={"/about"}>
            <li>About</li>{" "}
          </Link>
          {currentUser ? (
            <Link to={"/profile"}>
              <img
                className="h-10 w-10 rounded-full object-cover hover:border-black border-2 transition duration-150 ease-in-out"
                src={currentUser.profilePicture}
                alt={`${currentUser.username}'s profile`}
                title={currentUser.username}
              />
            </Link>
          ) : (
            <Link to={"/sign-in"}>
              {" "}
              <li>Sign In</li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
