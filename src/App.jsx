import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { Route, Switch, Redirect } from "react-router-dom";

import "./App.scss";
import Dashboard from "./components/dashboard/dashboard";
import Signup from "./components/signup/signup";
import Login from "./components/login/login";
import Navbar from "./components/navbar/navbar";
import Questionnaire from "./components/questionnaire/questionnaire";
import PageNotFound from "./components/page-not-found/page-not-found";

export default class App extends Component {
  state = { userInfo: null, isUserLoggedIn: false };
  auth = firebase.auth();

  componentDidMount() {
    this.auth.onAuthStateChanged((user) => {
      this.setState({ userInfo: user, isUserLoggedIn: user ? true : false });
    });
  }

  handleLogout = async (event) => {
    event.preventDefault();
    await this.auth.signOut().then((user) => {
      this.setState({ isUserLoggedIn: user ? true : false, userInfo: user });
    });
  };

  render() {
    return (
      <React.Fragment>
        <Navbar {...this.state} onLogout={this.handleLogout}></Navbar>
        <main className="quiz-container">
          <Switch>
            <Route
              path="/login"
              render={() => <Login {...this.state}></Login>}
            ></Route>
            <Route
              path="/signup"
              render={() => <Signup {...this.state}></Signup>}
            ></Route>
            <Route path="/questionnaire" component={Questionnaire}></Route>
            <Route path="/page-not-found" component={PageNotFound}></Route>
            <Route
              path="/"
              exact
              render={() => <Dashboard {...this.state}></Dashboard>}
            ></Route>
            <Redirect to="/page-not-found"></Redirect>
          </Switch>
        </main>
        <footer className="quiz-footer">Created by Praveen</footer>
      </React.Fragment>
    );
  }
}
