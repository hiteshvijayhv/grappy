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
          <p className="eyebrow">Simple, beautiful link sharing</p>
          <p className="title">One link for all your social profiles.</p>
          <p className="description">
            Build a professional profile page, keep your links fresh, and share one
            destination everywhere.
          </p>
          <button className="btn-signup" onClick={() => navigate('/register')}>
            Create your page
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home
