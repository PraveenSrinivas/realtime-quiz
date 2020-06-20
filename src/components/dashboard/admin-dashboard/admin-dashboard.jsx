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

  handleQuestionSelection = (event, questionAndAnswer) => {
    console.log(this.state.questionAndAnswers, questionAndAnswer);
    this.db.collection("display-question").doc("5fTUWUQCzVAKi44HAIJw").update({
      question: questionAndAnswer.question,
      options: questionAndAnswer.options,
    });
    this.db
      .collection("users")
      .doc(this.props.userInfo.uid)
      .update({ selection: questionAndAnswer.id });
    this.setState({ selection: questionAndAnswer.id });
  };

  componentDidMount() {
    this.db
      .collection("users")
      .doc(this.props.userInfo.uid)
      .get()
      .then((user) => {
        this.db.collection("question-and-answers").onSnapshot((snapshot) => {
          const questionAndAnswers = snapshot.docChanges().map((change) => {
            return { id: change.doc.id, ...change.doc.data() };
          });
          this.setState({
            questionAndAnswers,
            selection: user.data().selection,
          });
        });
      });
    this.db
      .collection("users")
      .where("isParticipant", "==", true)
      .onSnapshot((snapshot) => {
        console.log(snapshot.docChanges());
        const participantsUpdates = snapshot
          .docChanges()
          .filter((change) => change.type !== "removed")
          .map((change) => {
            const changeData = change.doc.data();
            return {
              id: change.doc.id,
              selection: changeData.selection,
              name: changeData.name,
            };
          });
        this.setState({ participantsUpdates: [...this.state.participantsUpdates, ...participantsUpdates] });
      });
  }

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
