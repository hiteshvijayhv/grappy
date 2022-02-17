import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Nav.css";

function Nav({ isLoggedin }) {
  const [isLogged, setIsLogged] = useState(false);

  const cookies = new Cookies();
  const navigate = useNavigate();
  const location = useLocation();
  const username = cookies.get("username");

  const currentLocation = location.pathname.toString().split("/");

  const logout = () => {
    //logout
    cookies.remove("jwttoken", { path: "/" });
    cookies.remove("username", { path: "/" });
    navigate("/login");
  };

  return (
    <div
      className="nav-container"
      style={{
        backgroundImage:
          currentLocation[1] === "login" ||
          currentLocation[2] === "edit" ||
          currentLocation[1] === "register" ||
          currentLocation[1] === ""
            ? "none"
            : "https://user-images.githubusercontent.com/46933160/154207277-6628fd3c-791f-4685-b2b7-821fede988cf.png",
      }}
    >
      <div>
        <h3 className="logo" onClick={() => navigate('/')}>Grappy</h3>
      </div>
      <div>
        {isLoggedin ? (
          <div className="btn-container">
            <div className="logout-btn" onClick={() => logout()}>
              Logout
            </div>
            <div
              className="edit-btn"
              onClick={() => navigate(`/${username}/edit`)}
            >
              Edit
            </div>
            <img
              src="https://user-images.githubusercontent.com/46933160/154405973-6bda5ae6-ce21-4fdc-8d09-ea8afd23a94d.png"
              className="profile-icon"
              onClick={() => navigate(`/${username}`)}
            />
          </div>
        ) : (
          <div className="btn-container">
            <button className="edit-btn" onClick={() => navigate("/login")}>
              Login
            </button>
            <button
              className="signup-btn"
              onClick={() => navigate("/register")}
            >
              SignUp
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Nav;
