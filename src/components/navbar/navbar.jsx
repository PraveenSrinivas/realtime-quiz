import React from "react";
import { Link, NavLink } from "react-router-dom";

import "./navbar.scss";

const getUsername = (userInfo = {}) => userInfo.displayName || "User";
const renderLogInActions = () => (
  <React.Fragment>
    <NavLink className="header-button" to="/signup">
      Signup
    </NavLink>
    <NavLink className="header-button" to="/login">
      Login
    </NavLink>
  </React.Fragment>
);

const renderLogOutActions = (props) => (
  <React.Fragment>
    <span className="welcome-message">
      Welcome {getUsername(props.userInfo)}
    </span>
    <button className="header-button logout-button" onClick={props.onLogout}>
      Logout
    </button>
  </React.Fragment>
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
