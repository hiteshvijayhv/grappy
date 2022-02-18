import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import FileBase64 from "react-file-base64";
import Nav from "./Nav";
import './Edit.css';

function Edit() {
  const API_ENDPOINT = "https://gosharee.herokuapp.com/";

  //get username from path params
  const location = useLocation();
  const username = location.pathname.toString().split("/")[1];

  const cookies = new Cookies();
  const token = cookies.get("jwttoken");

  const [linksData, setLinksData] = useState([]);
  const [showAddField, setShowAddField] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newURL, setNewURL] = useState("");
  const [profile, setProfile] = useState("");
  const [istoken, setisToken] = useState("");

  const getData = async () => {
    await axios.get(API_ENDPOINT + username).then((response) => {
      console.log(response + " sfsf");
      setLinksData(response.data.links);
      setProfile(response.data.profile);
    });
  };

  const saveData = async () => {
    if (newTitle && newURL) {
      setLinksData([...linksData, { title: newTitle, link: newURL }]);
      setShowAddField(false);
      setNewTitle("");
      setNewURL("");
    }

    await axios.post(API_ENDPOINT + username, {
      token: token,
      links:
        newTitle && newURL
          ? [...linksData, { title: newTitle, link: newURL }]
          : linksData,
      username: username,
      profile: profile,
    });
  };

  const deleteItem = async (index) => {
    setLinksData(linksData.filter((_, i) => i !== index));
    await axios.post(API_ENDPOINT + username, {
      token: token,
      links: linksData,
      username: username,
    });
  };

  useEffect(() => {
    token !== "" ? setisToken(true) : setisToken(false);
    getData();
  }, []);

  return (
    <div className="container">
      <Nav isLoggedin={istoken} />
      <div className="body">
        <div>
          <img className="profile-pic" src={profile} />
        </div>
        <h3>
          Upload Profile Picutre{" "}
          <FileBase64
            type="file"
            multiple={false}
            onDone={({ base64 }) => {
              setProfile(base64);
            }}
          />
        </h3>

        <div className="save-btn" onClick={() => saveData()}>
          Save Changes
        </div>

        <div
          className="addLink-btn"
          onClick={() => setShowAddField(!showAddField)}
        >
          Add Link
        </div>
        {showAddField && (
          <div className="list">
            <div>
              <input
                className="input-field"
                value={newTitle}
                onChange={(e) => {
                  setNewTitle(e.target.value);
                }}
                name="title"
                label="title"
                placeholder="title"
              />
              <input
                className="input-field"
                value={newURL}
                onChange={(e) => {
                  setNewURL(e.target.value);
                }}
                name="url"
                label="url"
                placeholder="url"
              />
            </div>
          </div>
        )}

        {linksData && (
          <div>
            {linksData.map((links, index) => {
              return (
                <div className="list" key={index}>
                  <div className="list-container">
                    <div onClick={() => deleteItem(index)}>
                      <img
                        className="delete-btn"
                        src="https://user-images.githubusercontent.com/46933160/154203438-ced8e107-f11b-40bd-a105-38f3a1ba0115.png"
                      />
                    </div>
                    <input
                      className="input-field"
                      value={linksData[index].title}
                      onChange={(e) => {
                        linksData[index].title = e.target.value;
                        setLinksData([...linksData]);
                      }}
                      name="title"
                      label="title"
                      placeholder="title"
                    />
                    <input
                      className="input-field"
                      value={links.link}
                      onChange={(e) => {
                        linksData[index].link = e.target.value;
                        setLinksData([...linksData]);
                      }}
                      name="link"
                      label="link"
                      placeholder="link"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Edit;
