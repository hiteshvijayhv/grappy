import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import "./Login.css";
import Nav from "./Nav";

const API_ENDPOINT = "http://gosharee.herokuapp.com/";

function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [istoken, setToken] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const cookies = new Cookies();
  const navigate = useNavigate();

  const validateForm = () => {
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedUsername) {
      setError("Username is required.");
      return false;
    }

    if (!emailRegex.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return false;
    }

    return true;
  };

  const loginUser = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_ENDPOINT}login`, {
        email: email.trim(),
        password,
      });

      const token = response.data;
      setToken(token);
      cookies.set("jwttoken", token, { path: "/" });
      cookies.set("username", username.trim(), { path: "/" });
      navigate(`/${username.trim()}/view`);
    } catch (requestError) {
      setError("Login failed. Check your credentials and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="main">
      <Nav isLoggedin={istoken === "" ? false : true} />
      <div className="form">
        <form className="auth-card input-form" onSubmit={loginUser}>
          <h2>Welcome back</h2>
          <p>Log in to manage your public link page.</p>
          <input
            className="input-field"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            name="username"
            label="username"
            placeholder="username"
            autoComplete="username"
          />

          <input
            className="input-field"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            name="email"
            label="email"
            placeholder="email"
            type="email"
            autoComplete="email"
          />

          <input
            className="input-field"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            name="password"
            label="password"
            type="password"
            placeholder="password"
            autoComplete="current-password"
          />

          {error && <p className="form-message error">{error}</p>}

          <button className="submit-btn" type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
