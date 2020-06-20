import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/firestore";

import "./user-dashboard.scss";

export default class UserDashboard extends Component {
  db = firebase.firestore();

  registerForQuiz = () => {
    this.db
      .collection("users")
      .doc(this.props.userInfo.uid)
      .update({ isParticipant: true });
  };

  render() {
    return (
      <div>
        <h2>User Dashboard</h2>
        <p>Click on start to enter the Quiz</p>
        <Link to="/questionnaire">
          <button onClick={this.registerForQuiz}>Start</button>
        </Link>
      </div>
    );
  }
}
