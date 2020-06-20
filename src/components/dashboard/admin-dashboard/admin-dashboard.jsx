import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/functions";

import "./admin-dashboard.scss";

export default class AdminDashboard extends Component {
  state = { email: "" };
  functions = firebase.functions();

  handleChange = (event) => {
    event.preventDefault();
    this.setState({ [event.currentTarget.name]: event.currentTarget.value });
  };

  makeAdmin = () => {
    const addAdminRole = this.functions.httpsCallable("addAdminRole");
    addAdminRole({ email: this.state.email }).then((result) => {
      console.log(result);
    });
  };
  render() {
    return (
      <div>
        <h4>Admin Dashboard works</h4>
        <input
          type="email"
          placeholder="Email address"
          value={this.state.email}
          onChange={this.handleChange}
          name="email"
        />
        <button onClick={this.makeAdmin}>Make Admin</button>
      </div>
    );
  }
}
