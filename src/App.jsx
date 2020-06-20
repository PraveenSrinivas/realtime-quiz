import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

import "./App.scss";
import Dashboard from "./components/dashboard/dashboard";
import Signup from "./components/signup/signup";
import Login from "./components/login/login";
import Navbar from "./components/navbar/navbar";
import Questionnaire from "./components/questionnaire/questionnaire";
import PageNotFound from "./components/page-not-found/page-not-found";

class App extends Component {
  state = { userInfo: null, isUserLoggedIn: false, isAdmin: false };
  auth = firebase.auth();
  db = firebase.firestore();
  history = this.props.history;

  handleLogin = (creds) => {
    this.auth.signInWithEmailAndPassword(creds.email, creds.password).then(
      (response) => {
        this.history.push("/");
      },
      (error) => {
        alert(error.message);
      }
    );
  };

  handleLogout = (event) => {
    event.preventDefault();
    if (this.state.isAdmin) {
      this.db
        .collection("users")
        .doc(this.state.userInfo.uid)
        .update({ selection: "" })
        .then(() => {
          this.auth.signOut();
          this.history.push("/");
        });
    } else {
      this.db
        .collection("users")
        .doc(this.state.userInfo.uid)
        .update({ isParticipant: false })
        .then(() => {
          this.auth.signOut();
          this.history.push("/");
        });
    }
  };

  handleSignup = (signupDetails) => {
    this.auth
      .createUserWithEmailAndPassword(
        signupDetails.email,
        signupDetails.password
      )
      .then(
        (response) => {
          return this.db
            .collection("users")
            .doc(response.user.uid)
            .set({
              name: signupDetails.username,
              email: signupDetails.email,
            })
            .then(() => {
              this.history.push("/");
            });
        },
        (error) => {
          alert(error.message);
        }
      );
  };

  componentDidMount() {
    this.auth.onAuthStateChanged((user) => {
      if (user)
        user.getIdTokenResult().then((idTokenResult) => {
          this.setState({
            userInfo: user,
            isUserLoggedIn: true,
            isAdmin: idTokenResult.claims.admin === true,
          });
        });
      else
        this.setState({
          userInfo: user,
          isUserLoggedIn: false,
          isAdmin: false,
        });
    });
  }

  render() {
    return (
      <React.Fragment>
        <Navbar {...this.state} onLogout={this.handleLogout} />
        <main className="quiz-container">
          <Switch>
            <Route
              path="/login"
              render={() => (
                <Login {...this.state} onLogin={this.handleLogin} />
              )}
            />
            <Route
              path="/signup"
              render={() => (
                <Signup {...this.state} onSignup={this.handleSignup} />
              )}
            />
            <Route
              path="/questionnaire"
              render={() => <Questionnaire {...this.state} />}
            />
            <Route
              path="/"
              exact
              render={() => <Dashboard {...this.state} />}
            ></Route>
            <Route path="/page-not-found" component={PageNotFound} />
            <Redirect to="/page-not-found" />
          </Switch>
        </main>
        <footer className="quiz-footer">Created by Praveen</footer>
      </React.Fragment>
    );
  }
}
export default withRouter(App);
