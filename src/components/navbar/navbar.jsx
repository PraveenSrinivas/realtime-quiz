import React from "react";
import { Link, NavLink } from "react-router-dom";

import "./navbar.scss";

const Navbar = (props) => {
  return (
    <nav className="quiz-header">
      <Link className="quiz-header-nav" to="/">
        Realtime Quiz App
      </Link>
      <span className="quiz-header-nav"></span>
      {props.isUserLoggedIn ? (
        <button className="quiz-header-nav" onClick={props.onLogout}>
          Logout
        </button>
      ) : (
        <React.Fragment>
          <NavLink className="quiz-header-nav" to="/signup">
            Signup
          </NavLink>
          <NavLink className="quiz-header-nav" to="/login">
            Login
          </NavLink>
        </React.Fragment>
      )}
    </nav>
  );
};
export default Navbar;
