import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import "./Login.css";
import Nav from "./Nav";

const API_ENDPOINT = "http://gosharee.herokuapp.com/";

function Login() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [istoken, setToken] = useState("");

  const cookies = new Cookies();
  const navigate = useNavigate();

  const loginUser = async () => {
    var token;
    await axios
      .post(`${API_ENDPOINT}login`, {
        email,
        password,
      })
      .then(function (response) {
        token = response.data;
        setToken(token);
        cookies.set("jwttoken", token, { path: "/" });
        cookies.set("username", username, { path: "/" });
        navigate(`/${username}/view`);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="main">
      <Nav isLoggedin={istoken === "" ? false : true} />
      <div className="form">
        <div className="input-form">
          <input
            className="input-field"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            name="username"
            label="username"
            placeholder="username"
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

          <div className="submit-btn" onClick={() => loginUser()}>
            Login
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
