import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./signup.scss";

export default class Signup extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    errorMessage: "",
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    if (this.isSignupFormValid()) {
      this.props.onSignup(this.state);
      this.setState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        errorMessage: "",
      });
    }
  };

  handleFormChange = (event) => {
    this.setState({ [event.currentTarget.name]: event.currentTarget.value });
  };

  isSignupFormValid = () => {
    if (this.state.email.length < 1) {
      this.setState({ errorMessage: "Enter a email address" });
      return false;
    } else if (this.state.password !== this.state.confirmPassword) {
      this.setState({ errorMessage: "Passwords don't match" });
      return false;
    }
    return true;
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
            required
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
            minLength="6"
            required
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
            onFocus={this.handleIncorrectPassword}
            minLength="6"
            required
          />
          <button className="signup-button" type="submit">
            Sign Up
          </button>
          {this.state.errorMessage ? (
            <span className="signup-form-error">{this.state.errorMessage}</span>
          ) : (
            ""
          )}
        </form>
        <p>
          Existing User? <Link to="/login">Login Here</Link>
        </p>
      </div>
    );
  }
}
