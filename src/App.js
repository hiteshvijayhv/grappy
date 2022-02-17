import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';
import Edit from "./components/Edit";
import Home from "./components/Home";
import LinksPage from "./components/LinksPage";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from './components/Profile'
import Nav from "./components/Nav";
import { useState } from "react";

import Cookies from "universal-cookie";

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/:username/view" element={<LinksPage />} />
          <Route path="/:username/edit" exact element={<Edit />} />
          <Route path='/:username' element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
