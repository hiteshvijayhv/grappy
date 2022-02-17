import React, { useEffect, useState } from 'react'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'
import Nav from './Nav';
import './Home.css'

function Home() {

  const cookies = new Cookies();
  const token = cookies.get("jwttoken");
  const [loggedIn, setLoggedin] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    token ? setLoggedin(true) : setLoggedin(false);
  })

  return (
    <div className="home-container">
      <Nav isLoggedin={loggedIn} />
      <div className="banner">
        <div className="body">
          <p className="title">One Link For All Your Social Profiles</p>
          <p className="description">Just share one link and connect</p>
          <div className="btn-signup">SignUp To Get Started</div>
        </div>
      </div>
    </div>
  );
}

export default Home