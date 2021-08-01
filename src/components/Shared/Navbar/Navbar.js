import React, { useContext } from "react";
import "./Navbar.css";
// @ts-ignore
import longLogo from "../../../images/longLogo.PNG";
import { UserContext } from "App";
import { Link } from "react-router-dom";

const Navbar = () => {
  // @ts-ignore
  const {loggedInUserData}= useContext(UserContext);
  const [loggedInUser, setLoggedInUser] = loggedInUserData;
  const signOut = () => {
    setLoggedInUser({});
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("email");
  };
  return (
    <div className="nav-wrapper">
      <div className="nav-area">
        <div className="logo-area">
          <Link to="/"><img src={longLogo} alt="logo" /></Link>
        </div>
        <div className="menu-area">
        
            {
               sessionStorage.getItem('token') || sessionStorage.getItem('email') || loggedInUser.email ?
               <a href="/dashboard" className="dashboard-link">Dashboard </a>
            :
            <></>
            }
          {
            sessionStorage.getItem('token')|| sessionStorage.getItem('email') || loggedInUser.email?
            <a href="/" onClick={signOut}>Sign Out</a>
            :<a className="sign-in-link"href="/login">Sign In</a>
          }
        </div>
      </div>
    </div>
  );
};

export default Navbar;
