import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import Cookies from "universal-cookie";

const API_ENDPOINT = "https://gosharee.herokuapp.com/";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [res, setRes] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const cookies = new Cookies();
  const token = cookies.get("jwttoken");

  const validateForm = () => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

    if (!trimmedName || trimmedName.length < 3) {
      setError("Username must be at least 3 characters.");
      return false;
    }

    if (!emailRegex.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (!passwordRegex.test(password)) {
      setError("Password must be 8+ chars and include letters and numbers.");
      return false;
    }

    return true;
  };

  const Submit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setError("");
    setRes("");
    setIsLoading(true);

    try {
      const normalizedName = name.trim();
      const normalizedEmail = email.trim();

      await axios.post(`${API_ENDPOINT}register`, {
        username: normalizedName,
        email: normalizedEmail,
        password,
      });

      const loginResponse = await axios.post(`${API_ENDPOINT}login`, {
        email: normalizedEmail,
        password,
      });

      cookies.set("jwttoken", loginResponse.data, { path: "/" });
      cookies.set("username", normalizedName, { path: "/" });
      setRes("Account created. Redirecting...");
      navigate(`/${normalizedName}/view`);
    } catch (requestError) {
      const apiMessage = requestError?.response?.data?.message;
      setError(apiMessage || "Could not sign up. Please verify your details and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  
  return (
    <div className="main">
      <Nav isLoggedin={token === "" ? true : false} />
      <div className="form">
        <form className="auth-card" onSubmit={Submit}>
          <h2>Create your account</h2>
          <p>Start sharing all your links from a single profile.</p>
          <input
            className="input-field"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            name="name"
            label="name"
            placeholder="name"
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
            autoComplete="new-password"
          />

          {error && <p className="form-message error">{error}</p>}
          {res && <p className="form-message success">{res}</p>}

          <button className="submit-btn" type="submit" disabled={isLoading}>
            {isLoading ? "Creating account..." : "SignUp"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
