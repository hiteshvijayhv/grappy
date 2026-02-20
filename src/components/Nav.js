import React from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import "./Nav.css";

function Nav({ isLoggedin }) {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const username = cookies.get("username");

  const logout = () => {
    //logout
    cookies.remove("jwttoken", { path: "/" });
    cookies.remove("username", { path: "/" });
    navigate("/login");
  };

  return (
    <div className="nav-container">
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
