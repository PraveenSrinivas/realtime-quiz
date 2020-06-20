import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./login.scss";

export default class Login extends Component {
  state = { email: "", password: "" };

  handleFormChange = (event) => {
    this.setState({ [event.currentTarget.name]: event.currentTarget.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onLogin(this.state);
    this.setState({ email: "", password: "" });
  };

  render() {
    return (
      <div className="login-container">
        <form className="login-form-container" onSubmit={this.handleSubmit}>
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
            required
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
            required
          />
          <button className="login-button" type="submit">
            Login
          </button>
        </form>
        <p>
          New User ? <Link to="/signup">Sign Up here</Link>
        </p>
      </div>
    );
  }
}
