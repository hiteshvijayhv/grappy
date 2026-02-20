import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import { Navigate, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import Cookies from "universal-cookie";

const API_ENDPOINT = "http://gosharee.herokuapp.com/";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [res, setRes] = useState("");

  const navigate = useNavigate();

  const [isLoggedin, setIsLoggedin] = useState(false);
  const cookies = new Cookies();
  const token = cookies.get("jwttoken");



  const Submit = async () => {
    await axios
      .post(`${API_ENDPOINT}register`, {
        username: name,
        email: email,
        password: password,
      })
      .then(function (response) {
        navigate("/login");
      })
      .catch(function (error) {
      });
  };

  
  return (
    <div className="main">
      <Nav isLoggedin={token === "" ? true : false} />
      <div className="form">
        <div className="auth-card">
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
          />

          <div>
            <div className="submit-btn" onClick={() => Submit()}>
              SignUp
            </div>
          </div>
        </div>
        <h1 className="res">{res}</h1>
      </div>
    </div>
  );
}

export default Register;
