import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/functions";
import "firebase/firestore";

import "./admin-dashboard.scss";

export default class AdminDashboard extends Component {
  state = {
    email: "",
    questionAndAnswers: [],
    selection: "",
    participantsUpdates: [],
  };
  optionsAlphabets = ["A", "B", "C", "D"];
  functions = firebase.functions();
  db = firebase.firestore();

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
        const participantsUpdates = snapshot.docChanges().map((change) => {
          const changeData = change.doc.data();
          return {
            id: change.doc.id,
            selection: changeData.selection,
            name: changeData.name,
          };
        });
        this.setState({ participantsUpdates });
      });
  }

  render() {
    return (
      <div className="admin-dashboard-container">
        {/* <input
          type="email"
          placeholder="Email address"
          value={this.state.email}
          onChange={this.handleChange}
          name="email"
        />
        <button onClick={this.makeAdmin}>Make Admin</button> */}
        <div className="admin-dashboard-questions-container">
          <h2 className="admin-dashboard-questions-list-title">
            Questions List
          </h2>
          {this.state.questionAndAnswers.map((questionAndAnswer) => (
            <div
              className={`question-answer-container ${
                this.state.selection === questionAndAnswer.id ? "selected" : ""
              }`}
              key={questionAndAnswer.id}
              onClick={(event) =>
                this.handleQuestionSelection(event, questionAndAnswer)
              }
            >
              <p>Question : {questionAndAnswer.question}</p>
              <div className="answer-container">
                {questionAndAnswer.options.map((answer, index) => (
                  <span
                    className={`options ${
                      answer === questionAndAnswer.answer
                        ? "correct-answer"
                        : ""
                    }`}
                    key={index}
                  >{`${this.optionsAlphabets[index]} : ${answer}`}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="admin-dashboard-user-updates-container">
          <h3>User interaction updates</h3>
          {this.state.participantsUpdates.map((participant) => (
            <span key={participant.id}>
              {participant.name} has selected {participant.selection}
            </span>
          ))}
        </div>
      </div>
    );
  }
}
