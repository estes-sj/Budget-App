import React, { useState, useEffect } from "react";
import "./login.css";
import { User } from "../types";
import axios from "axios";
import useToken from "../components/useToken";

const LandingPage = () => {
  const { token, removeToken, setToken } = useToken();
  const [user, setUser] = useState(null);
  const [isShown, setIsShown] = useState(false);

  const handleClick = (_event) => {
    // toggle shown state
    setIsShown((current) => !current);
  };

  const logoutUser = async () => {
    await axios.post("http://10.100.0.2:5000/logout");
    window.location.href = "/";
  };

  const ledger = async () => {
    await axios.post("http://10.100.0.2:5000/ledger");
    window.location.href = "/";
  };

  useEffect(() => {
    (async () => {
      try {
        const resp = await axios.get("http://10.100.0.2:5000/@me");
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
          const foundUser = JSON.parse(loggedInUser);
          setUser(foundUser);
          console.log("##2");
          console.log(foundUser);
        }
      } catch (error) {
        console.log("Not authenticated");
        console.log("##3");
        console.log(localStorage.getItem("user"));
      }
    })();
  }, []);

  return (
    <>
      <header>
        <div className="top">Budget Application</div>
      </header>
      {user != null ? (
        <div className="panel">
          <div>
            <h2>Welcome! Logged in</h2>
            <h3>ID: {user.id}</h3>
            <h3>Email: {user.email}</h3>
            <button onClick={logoutUser}>Logout</button>
          </div>
          <div>
            <h2>Choose Monthly Sheet</h2>
            <button className="pricing-button" onClick={handleClick}>
              Create New Monthly Sheet
            </button>
            {/* show elements on click */}
            {isShown && (
              <div>
                <select name="" id="">
                  <option value="">January</option>
                  <option value="">February</option>
                  <option value="">March</option>
                  <option value="">April</option>
                  <option value="">May</option>
                  <option value="">June</option>
                  <option value="">July</option>
                  <option value="">August</option>
                  <option value="">September</option>
                  <option value="">October</option>
                  <option value="">November</option>
                  <option value="">December</option>
                </select>
                <select name="" id="">
                  <option value="">2012</option>
                  <option value="">2013</option>
                  <option value="">2014</option>
                  <option value="">2015</option>
                  <option value="">2016</option>
                  <option value="">2017</option>
                  <option value="">2018</option>
                  <option value="">2019</option>
                  <option value="">2020</option>
                  <option value="">2021</option>
                  <option value="">2022</option>
                  <option value="">2023</option>
                  <option value="">2024</option>
                  <option value="">2025</option>
                  <option value="">2026</option>
                  <option value="">2027</option>
                </select>
                <a href="/ledger">
                  <button className="pricing-button">Go</button>
                </a>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="panel">
          <div>
            <h2 className="pricing-header">Currently Not Signed-In</h2>
            <div className="buttons">
              <a href="/login">
                <button className="pricing-button is-featured">Login</button>
              </a>
              <a href="/register">
                <button className="pricing-button">Register</button>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LandingPage;
