import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/auth";

import "./login.scss";

export default class Login extends Component {
  state = { email: "", password: "" };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const auth = firebase.auth();
    auth
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((response) => {
        console.log(response);
        if (response.code === 400) {
          console.error(response.message);
        }
      });
    this.setState({ email: "", password: "" });
  };

  handleFormChange = (event) => {
    this.setState({ [event.currentTarget.name]: event.currentTarget.value });
  };

  render() {
    return (
      <div className="login-container">
        <form className="login-form-container" onSubmit={this.handleFormSubmit}>
          <h2 className="login-form-title">LOGIN</h2>
          <label className="login-form-label" htmlFor="email">
            Email Address
          </label>
          <input
            className="login-form-control"
            id="email"
            type="email"
            placeholder="Enter your email address"
            name="email"
            value={this.state.email}
            onChange={this.handleFormChange}
          />
          <label className="login-form-label" htmlFor="password">
            Password
          </label>
          <input
            className="login-form-control"
            id="password"
            type="password"
            placeholder="********"
            name="password"
            value={this.state.password}
            onChange={this.handleFormChange}
          />
          <button className="login-button" type="submit">
            Login
          </button>
        </form>
      </div>
    );
  }
}
