import React from "react";
import { Link, NavLink } from "react-router-dom";

import "./navbar.scss";

const getUsername = (userInfo = {}) => userInfo.displayName || "User";
const renderLogInActions = () => (
  <div>
    <NavLink className="header-button" to="/signup">
      Signup
    </NavLink>
    <NavLink className="header-button" to="/login">
      Login
    </NavLink>
  </div>
);

const renderLogOutActions = (props) => (
  <div>
    <span className="welcome-message">Welcome {getUsername(props.userInfo)}</span>
    <button className="header-button logout-button" onClick={props.onLogout}>
      Logout
    </button>
  </div>
);

const Navbar = (props) => {
  return (
    <nav className="quiz-header">
      <Link className="app-name" to="/">
        Realtime Quiz App
      </Link>
      <div className="user-action-wrapper">
        {props.isUserLoggedIn
          ? renderLogOutActions(props)
          : renderLogInActions(props)}
      </div>
    </nav>
  );
};
export default Navbar;
