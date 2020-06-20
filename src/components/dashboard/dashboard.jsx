import React, { Component } from "react";

import "./dashboard.scss";
import { Link } from "react-router-dom";
import AdminDashboard from "./admin-dashboard/admin-dashboard";
import UserDashboard from "./user-dashboard/user-dashboard";

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        {this.props.isUserLoggedIn ? (
          <React.Fragment>
            {this.props.isAdmin ? (
              <AdminDashboard {...this.props} />
            ) : (
              <UserDashboard {...this.props} />
            )}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h4>Welcome to the Realtime Quiz App</h4>
            <p>Users will be able to participate in Quiz hosted by the Admin</p>
            <Link to="/login">Login to explore</Link>
          </React.Fragment>
        )}
      </div>
    );
  }
}
