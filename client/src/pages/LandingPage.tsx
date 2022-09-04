import React, { useState, useEffect } from "react";
import httpClient from "../httpClient";
import "./login.css";
import { User } from "../types";

const LandingPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const logoutUser = async () => {
    await httpClient.post("//10.100.0.2:5000/logout");
    window.location.href = "/";
  };

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get("//10.100.0.2:5000/@me");
        setUser(resp.data);
      } catch (error) {
        console.log("Not authenticated");
      }
    })();
  }, []);

  return (
    <>
    <body>
    <header><div className="top">Budget Application</div></header>
    <div className="panel">
      {user != null ? (
        <div>
          <h2>Welcome! Logged in</h2>
          <h3>ID: {user.id}</h3>
          <h3>Email: {user.email}</h3>

          <button onClick={logoutUser}>Logout</button>
        </div>
      ) : (
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
      )}
    </div>
    </body>
    </>
    
  );
};

export default LandingPage;
