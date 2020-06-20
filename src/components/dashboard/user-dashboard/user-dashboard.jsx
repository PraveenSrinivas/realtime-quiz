import React, { Component } from "react";
import "./user-dashboard.scss";
import Questionnaire from "../../questionnaire/questionnaire";

export default class UserDashboard extends Component {
  render() {
    return (
      <div>
        <h2>User Dashboard</h2>
        <Questionnaire />
      </div>
    );
  }
}
