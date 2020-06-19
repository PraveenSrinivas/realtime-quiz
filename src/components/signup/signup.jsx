import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/auth";

import "./signup.scss";

export default class Signup extends Component {
  state = { username: "", email: "", password: "" };
  doPasswordsMatch = false;

  handleFormSubmit = (event) => {
    event.preventDefault();
    if (this.doPasswordsMatch) {
      const auth = firebase.auth();
      auth
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((response) => {
          console.log(response);
          if (response.code === 400) {
            console.error("User already exists");
          }
        });
      this.setState({ username: "", email: "", password: "" });
    }
  };

  handleFormChange = (event) => {
    if (event.currentTarget.name === "confirmPassword") {
      this.doPasswordsMatch = event.currentTarget.value === this.state.password;
      if (!this.doPasswordsMatch) console.error("Passwords don't match");
    }
    this.setState({ [event.currentTarget.name]: event.currentTarget.value });
  };

  render() {
    return (
      <div className="signup-container">
        <form
          className="signup-form-container"
          onSubmit={this.handleFormSubmit}
        >
          <h2 className="signup-form-title">SIGN UP</h2>
          <label className="signup-form-label" htmlFor="username">
            Name
          </label>
          <input
            className="signup-form-control"
            id="username"
            type="text"
            placeholder="Enter your name"
            name="username"
            value={this.state.username}
            onChange={this.handleFormChange}
          />
          <label className="signup-form-label" htmlFor="email">
            Email Address
          </label>
          <input
            className="signup-form-control"
            id="email"
            type="email"
            placeholder="Enter your email address"
            name="email"
            value={this.state.email}
            onChange={this.handleFormChange}
          />
          <label className="signup-form-label" htmlFor="password">
            Password
          </label>
          <input
            className="signup-form-control"
            id="password"
            type="password"
            placeholder="********"
            name="password"
            value={this.state.password}
            onChange={this.handleFormChange}
          />
          <label className="signup-form-label" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className="signup-form-control"
            id="confirmPassword"
            type="password"
            placeholder="********"
            name="confirmPassword"
            value={this.state.confirmPassword}
            onChange={this.handleFormChange}
          />
          <button className="signup-button" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}
