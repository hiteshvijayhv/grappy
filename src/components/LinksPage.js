import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Nav from "./Nav";
import './LinksPage.css'


function LinksPage() {
  const API_ENDPOINT = "https://gosharee.herokuapp.com/";
  //get username from path params in
  const location = useLocation();
  const username = location.pathname.toString().split("/")[1];
  const cookies = new Cookies();
  const token = cookies.get("jwttoken");

  const [linksData, setLinksData] = useState([]);
  const [isToken, setisToken] = useState(true);
  const [profile, setProfile] = useState("");

  const navigate = useNavigate();

  const getData = async () => {
    await axios.get(API_ENDPOINT + username).then((response) => {
      setLinksData(response.data.links);
      setProfile(response.data.profile);
    });
  };

  useEffect(() => {
    token ? setisToken(true) : setisToken(false);
    getData();
  }, []);

  return (
    <div>
      <Nav isLoggedin={isToken} />
      <div className="links-container">
        <img className="profile-img" src={profile} />
        <h4>@{username}</h4>

        {linksData && (
          <div className="links-div">
            {linksData.map((links) => {
              return (
                <a
                  className="links"
                  key={links.title}
                  href={"https://" + links.link}
                  target="_blank"
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
