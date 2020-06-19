import React, { Component } from "react";

import "./dashboard.scss";

export default class Dashboard extends Component {
  handleLogout = (event) => {
    event.preventDefault();
    this.auth.signOut().then((user) => {
      this.setState({ isUserLoggedIn: false });
    });
  };
  render() {
    return (
      <div>
        <h4>Welcome to the Realtime Quiz App</h4>
        <p>
          You can participate in quiz that are hosted by the admin in realtime
        </p>
      </div>
    );
  }
}
