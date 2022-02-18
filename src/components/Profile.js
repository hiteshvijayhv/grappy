import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Nav from "./Nav";
import "./Profile.css";

function LinksPage() {
  const API_ENDPOINT = "http://gosharee.herokuapp.com/";
  //get username from path params in
  const location = useLocation();
  const username = location.pathname.toString().split("/")[1];
  const cookies = new Cookies();
  const token = cookies.get("jwttoken");

  const [linksData, setLinksData] = useState([]);
  const [profile, setProfile] = useState(
    "https://user-images.githubusercontent.com/46933160/153798611-5f0fa241-31e6-4c93-8d2a-631450c478eb.png"
  );
  const [loggedIn, setLoggedin] = useState(false);

  const navigate = useNavigate();

  const getData = async () => {
    await axios.get(API_ENDPOINT + username).then((response) => {
      setProfile(response.data.profile);
      setLinksData(response.data.links);
    });
  };

  useEffect(() => {
    token ? setLoggedin(true) : setLoggedin(false);
    getData();
  }, []);

  return (
    <div>
      <Nav isLoggedin={loggedIn ? true : false} />
      <div className="links-container">
        <img
          className="profile-img"
          src={profile}
          width="100px"
          imageStyle={{ borderRadius: 6 }}
        />

        <h1>@{username}</h1>
        {linksData && (
          <div className="links-div">
            {linksData.map((links) => {
              return (
                <a className="links"
                  href={"https://" + links.link}
                  target="_blank"
                  key={links.title}
                >
                  {links.title}
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default LinksPage;
